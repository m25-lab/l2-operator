export class WsException extends Error {
  public status: number
  public message: any

  constructor(status: number, message: any) {
    super(JSON.stringify(message))
    this.status = status
    this.message = message
  }
}
