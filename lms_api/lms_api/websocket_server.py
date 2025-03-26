# websocket_server.py
import asyncio
from websockets import serve
from routing import application

async def run_websocket_server():
    server = await serve(application, '127.0.0.1', 8001)
    await server.wait_closed()

if __name__ == "__main__":
    asyncio.run(run_websocket_server())
