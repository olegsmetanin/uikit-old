import {IEvent} from './IEvent'

export interface IEventBus {
  on: <T extends IEvent>(type: string, fn: (event: T) => void) => IEventBus
  off: <T extends IEvent>(type: string, fn: (event: T) => void) => IEventBus
  emit: <T extends IEvent>(type: string, event: T) => boolean
}
