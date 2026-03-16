import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Loader2, ShieldCheck, Clock, Smartphone } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'
import { useBookingStore } from '../store/bookingStore'
import { onboard, sendOtp, verifyOtp } from '../api/auth'

type Step = 'phone' | 'otp'
const OTP_LENGTH = 6

export default function Login() {
  const navigate = useNavigate()
  const { setAuth } = useBookingStore()

  const [step, setStep] = useState<Step>('phone')
  const [phone, setPhone] = useState('')
  const [otp, setOtp] = useState<string[]>(Array(OTP_LENGTH).fill(''))
  const [tempAuthToken, setTempAuthToken] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [countdown, setCountdown] = useState(0)

  const otpValue = otp.join('')

  useEffect(() => {
    if (countdown <= 0) return
    const t = setTimeout(() => setCountdown((c) => c - 1), 1000)
    return () => clearTimeout(t)
  }, [countdown])

  useEffect(() => {
    if (otpValue.length === OTP_LENGTH && step === 'otp') handleVerifyOtp()
  }, [otpValue])

  async function handleSendOtp() {
    if (phone.length < 10) return
    setLoading(true); setError('')
    try {
      const token = await onboard()
      setTempAuthToken(token)
      await sendOtp(phone, token)
      setStep('otp')
      setCountdown(60)
    } catch {
      setError('Failed to send OTP. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  async function handleVerifyOtp() {
    if (otpValue.length < OTP_LENGTH) return
    setLoading(true); setError('')
    try {
      const userToken = await verifyOtp(otpValue, tempAuthToken)
      setAuth(userToken)
      navigate('/confirm')
    } catch {
      setError('Invalid OTP. Please try again.')
      setOtp(Array(OTP_LENGTH).fill(''))
      document.getElementById('otp-0')?.focus()
    } finally {
      setLoading(false)
    }
  }

  async function handleResend() {
    if (countdown > 0) return
    setOtp(Array(OTP_LENGTH).fill(''))
    setError('')
    try {
      await sendOtp(phone, tempAuthToken)
      setCountdown(60)
    } catch {
      setError('Failed to resend OTP.')
    }
  }

  function handleOtpChange(index: number, val: string) {
    const digit = val.replace(/\D/g, '').slice(-1)
    const next = [...otp]
    next[index] = digit
    setOtp(next)
    if (digit && index < OTP_LENGTH - 1) document.getElementById(`otp-${index + 1}`)?.focus()
  }

  function handleOtpKeyDown(index: number, e: React.KeyboardEvent) {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      document.getElementById(`otp-${index - 1}`)?.focus()
    }
  }

  function handleOtpPaste(e: React.ClipboardEvent) {
    const text = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, OTP_LENGTH)
    if (text.length === OTP_LENGTH) { setOtp(text.split('')); e.preventDefault() }
  }

  return (
    <div className="min-h-dvh bg-[#0A0A0A] flex flex-col">

      {/* Navbar */}
      <header className="border-b border-[#1A1A1A] px-6 py-4 flex items-center gap-3">
        <button
          onClick={() => step === 'otp' ? (setStep('phone'), setError('')) : navigate('/')}
          className="text-[#808080] hover:text-white transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div className="flex items-center gap-2.5">
          <img src="/assets/pluto_logo.png" alt="Pluto" className="h-8 w-auto" />
          
        </div>
      </header>

      {/* Two-column layout */}
      <main className="flex-1 flex items-center justify-center px-4 py-12 md:py-20">
        <div className="w-full max-w-5xl flex flex-col md:flex-row items-center gap-12">

          {/* Left — trust copy */}
          <div className="flex-1 flex flex-col gap-6 text-center md:text-left">
            <div>
              <span className="inline-block text-[12px] font-semibold text-primary uppercase tracking-widest bg-primary/10 border border-primary/20 px-3 py-1 rounded-full mb-4">
                Quick Verification
              </span>
              <h1 className="text-[36px] md:text-[44px] font-bold text-white leading-[1.1] tracking-tight">
                One step away<br />
                <span className="text-primary">from your ride.</span>
              </h1>
            </div>
            <p className="text-[#808080] text-[15px] leading-relaxed max-w-sm mx-auto md:mx-0">
              Verify your mobile number to save your booking and get notified when your ride is approved.
            </p>

            <div className="flex flex-col gap-3 mt-2">
              {[
                { icon: ShieldCheck, text: 'Your number is never shared with anyone' },
                { icon: Clock, text: 'OTP expires in 60 seconds for security' },
                { icon: Smartphone, text: 'Same number used in the Pluto app' },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-3 justify-center md:justify-start">
                  <div className="w-7 h-7 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                    <Icon className="w-3.5 h-3.5 text-primary" />
                  </div>
                  <span className="text-[#555] text-[13px]">{text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right — form */}
          <div className="w-full md:w-[420px] shrink-0">
            <div className="bg-[#111111] border border-[#1E1E1E] rounded-2xl shadow-2xl p-8 flex flex-col gap-6">

              {/* Step indicator */}
              <div className="flex items-center gap-3">
                <div className={cn('flex items-center justify-center w-7 h-7 rounded-full text-[12px] font-bold border transition-all',
                  step === 'phone' ? 'bg-primary border-primary text-white' : 'bg-primary/10 border-primary/30 text-primary'
                )}>1</div>
                <div className={cn('h-px flex-1 transition-colors', step === 'otp' ? 'bg-primary/30' : 'bg-[#1E1E1E]')} />
                <div className={cn('flex items-center justify-center w-7 h-7 rounded-full text-[12px] font-bold border transition-all',
                  step === 'otp' ? 'bg-primary border-primary text-white' : 'bg-[#0A0A0A] border-[#2C2C2C] text-[#444]'
                )}>2</div>
              </div>

              <div>
                <h2 className="text-white font-bold text-[22px]">
                  {step === 'phone' ? 'Enter mobile number' : 'Enter OTP'}
                </h2>
                <p className="text-[#555] text-[13px] mt-1">
                  {step === 'phone'
                    ? "We'll send a 6-digit code to your number"
                    : `Code sent to +91 ${phone.slice(0, 5)}XXXXX`}
                </p>
              </div>

              <Separator className="bg-[#2C2C2C]" />

              {step === 'phone' ? (
                <>
                  <div className="flex flex-col gap-1.5">
                    <Label className="text-[12px] font-medium text-[#808080]">Mobile number</Label>
                    <div className={cn(
                      'flex items-center gap-3 bg-[#0A0A0A] border rounded-xl px-4 h-12 transition-colors',
                      'border-[#2C2C2C] focus-within:border-primary'
                    )}>
                      <span className="text-[#808080] text-[14px] font-semibold shrink-0">+91</span>
                      <div className="w-px h-5 bg-[#2C2C2C]" />
                      <input
                        type="tel"
                        inputMode="numeric"
                        maxLength={10}
                        value={phone}
                        onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                        onKeyDown={(e) => e.key === 'Enter' && handleSendOtp()}
                        placeholder="10-digit mobile number"
                        className="flex-1 bg-transparent text-white text-[16px] placeholder:text-[#3A3A3A] outline-none"
                        autoFocus
                      />
                      {phone.length === 10 && (
                        <div className="w-2 h-2 rounded-full bg-primary shrink-0" />
                      )}
                    </div>
                  </div>

                  {error && <p className="text-[#FF4747] text-[13px]">{error}</p>}

                  <Button
                    onClick={handleSendOtp}
                    disabled={phone.length < 10 || loading}
                    className={cn(
                      'w-full h-12 rounded-xl text-[15px] font-semibold transition-all',
                      phone.length >= 10
                        ? 'bg-primary hover:bg-primary/85 text-white shadow-[0_4px_20px_rgba(87,184,84,0.2)]'
                        : 'bg-[#1A1A1A] text-[#444] cursor-not-allowed'
                    )}
                  >
                    {loading
                      ? <span className="flex items-center gap-2 justify-center"><Loader2 className="w-4 h-4 animate-spin" /> Sending…</span>
                      : 'Send OTP →'}
                  </Button>
                </>
              ) : (
                <>
                  <div className="flex flex-col gap-3">
                    <Label className="text-[12px] font-medium text-[#808080]">6-digit OTP</Label>
                    <div className="flex gap-2" onPaste={handleOtpPaste}>
                      {otp.map((digit, i) => (
                        <Input
                          key={i}
                          id={`otp-${i}`}
                          type="text"
                          inputMode="numeric"
                          maxLength={1}
                          value={digit}
                          onChange={(e) => handleOtpChange(i, e.target.value)}
                          onKeyDown={(e) => handleOtpKeyDown(i, e)}
                          className={cn(
                            'flex-1 h-14 text-center text-[20px] font-bold bg-[#0A0A0A] border-[#2C2C2C] text-white rounded-xl transition-colors p-0',
                            'focus-visible:ring-1 focus-visible:ring-primary focus-visible:border-primary',
                            digit && 'border-primary/50 text-primary'
                          )}
                          autoFocus={i === 0}
                        />
                      ))}
                    </div>

                    <div className="flex items-center justify-between pt-1">
                      <button
                        onClick={handleResend}
                        disabled={countdown > 0}
                        className={cn(
                          'text-[13px] transition-colors',
                          countdown > 0 ? 'text-[#444]' : 'text-primary hover:text-primary/80'
                        )}
                      >
                        {countdown > 0 ? `Resend OTP in ${countdown}s` : 'Resend OTP'}
                      </button>
                      <button
                        onClick={() => { setStep('phone'); setError(''); setOtp(Array(OTP_LENGTH).fill('')) }}
                        className="text-[#555] hover:text-[#808080] text-[13px] transition-colors"
                      >
                        ← Change number
                      </button>
                    </div>
                  </div>

                  {error && <p className="text-[#FF4747] text-[13px] text-center">{error}</p>}

                  <Button
                    onClick={handleVerifyOtp}
                    disabled={otpValue.length < OTP_LENGTH || loading}
                    className={cn(
                      'w-full h-12 rounded-xl text-[15px] font-semibold transition-all',
                      otpValue.length >= OTP_LENGTH
                        ? 'bg-primary hover:bg-primary/85 text-white shadow-[0_4px_20px_rgba(87,184,84,0.2)]'
                        : 'bg-[#1A1A1A] text-[#444] cursor-not-allowed'
                    )}
                  >
                    {loading
                      ? <span className="flex items-center gap-2 justify-center"><Loader2 className="w-4 h-4 animate-spin" /> Verifying…</span>
                      : 'Verify & Continue →'}
                  </Button>
                </>
              )}

              <p className="text-center text-[11px] text-[#333]">
                By continuing you agree to Pluto's{' '}
                <a href="#" className="text-[#444] hover:text-[#808080] underline">Terms of Service</a>
              </p>
            </div>
          </div>

        </div>
      </main>
    </div>
  )
}
