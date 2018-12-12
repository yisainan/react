package interview.socket;

import java.io.IOException;
import java.net.InetSocketAddress;
import java.nio.ByteBuffer;
import java.nio.channels.SelectionKey;
import java.nio.channels.Selector;
import java.nio.channels.ServerSocketChannel;
import java.nio.channels.SocketChannel;
import java.util.Iterator;
import java.util.Set;

public class NioServer {

  public static void main(String[] args) throws IOException {
    ServerSocketChannel serverChannel =
        ServerSocketChannel.open();
    serverChannel.configureBlocking(false);
    serverChannel.bind(new InetSocketAddress(8888));
    System.out.println("Listening on "
        + serverChannel.getLocalAddress());

    Selector selector = Selector.open();
    serverChannel.register(selector, SelectionKey.OP_ACCEPT);

    ByteBuffer buffer = ByteBuffer.allocate(1024);
    RequestHandler requestHandler = new RequestHandler();
    while (true) {
      int selected = selector.select();
      if (selected == 0) {
        continue;
      }

      Set<SelectionKey> selectedKeys = selector.selectedKeys();
      Iterator<SelectionKey> keyIter = selectedKeys.iterator();

      while (keyIter.hasNext()) {
        SelectionKey key = keyIter.next();

        if (key.isAcceptable()) {
          ServerSocketChannel channel =
              (ServerSocketChannel) key.channel();
          SocketChannel clientChannel = channel.accept();
          System.out.println("Incoming connection from "
              + clientChannel.getRemoteAddress());
          clientChannel.configureBlocking(false);
          clientChannel.register(
              selector, SelectionKey.OP_READ);
        }

        if (key.isReadable()) {
          SocketChannel channel =
              (SocketChannel) key.channel();
          channel.read(buffer);
          String request = new String(buffer.array()).trim();
          buffer.clear();
          System.out.println(String.format(
              "Request from %s: %s",
              channel.getRemoteAddress(),
              request));
          String response = requestHandler.handle(request);
          channel.write(ByteBuffer.wrap(response.getBytes()));
        }

        keyIter.remove();
      }
    }
  }
}
