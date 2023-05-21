export interface Consumer {
  connect: () => Promise<void>
  disconnect: () => Promise<void>
  consume: (message: any) => Promise<void>
}
