import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  ConnectedSocket
} from '@nestjs/websockets'
import { Server, Socket } from 'socket.io'
import config from '../../config/config'

@WebSocketGateway(config.wsPort)
export class ChatGateway {
  @WebSocketServer()
  server: Server

  @SubscribeMessage('hello')
  hello(@MessageBody() data: any): any {
    return {
      "event": "hello2",
      "data": data,
    };
  }
}