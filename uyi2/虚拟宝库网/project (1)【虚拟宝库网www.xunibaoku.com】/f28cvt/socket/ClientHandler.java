package interview.socket;

import java.io.IOException;
import java.net.Socket;
import java.util.Scanner;

public class ClientHandler implements Runnable {

  private final Socket clientSocket;
  private final RequestHandler requestHandler;

  public ClientHandler(
      Socket clientSocket, RequestHandler requestHandler) {
    this.clientSocket = clientSocket;
    this.requestHandler = requestHandler;
  }

  @Override
  public void run() {
    try (Scanner input =
        new Scanner(clientSocket.getInputStream())) {
      while (true) {
        String request = input.nextLine();

        if (request.equals("quit")) {
          break;
        }

        System.out.println(String.format(
            "Request from %s: %s",
            clientSocket.getRemoteSocketAddress(),
            request));

        String response = requestHandler.handle(request);
        clientSocket.getOutputStream().write(
            response.getBytes());
      }
    } catch (IOException e) {
      throw new RuntimeException(e);
    }
  }
}
