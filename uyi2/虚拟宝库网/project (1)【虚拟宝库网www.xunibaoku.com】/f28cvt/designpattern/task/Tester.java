package interview.designpattern.task;

public class Tester {

  public static void main(String[] args) {
    new LoggingRunnable(
        new TransactionalRunnable(
            new CodingTask(0))).run();
  }
}
