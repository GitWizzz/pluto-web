export function getDeviceId(): string {
  let id = localStorage.getItem('pluto_device_id')
  if (!id) {
    id = crypto.randomUUID()
    localStorage.setItem('pluto_device_id', id)
  }
  return id
}
