import {IEvent} from 'api/event/IEvent';
import {IEventBus} from 'api/event/IEventBus';
import {EventEmitter} from 'eventemitter3';

export class EventBus implements IEventBus {

  on: <T extends IEvent>(type: string, fn: (event: T) => void) => IEventBus
  off: <T extends IEvent>(type: string, fn: (event: T) => void) => IEventBus
  emit: <T extends IEvent>(type: string, event: T) => boolean

  constructor() {
    var eventBus = new EventEmitter()

    this.on = function (type: string, fn: Function) {
      return eventBus.on(type, fn as EventEmitter.ListenerFn)
    }

    this.off = function (type: string, fn: Function) {
      return eventBus.off(type, fn as EventEmitter.ListenerFn)
    }

    this.emit =  function (type: string, event: any) {
      return eventBus.emit(type, event)
    }
  }

}