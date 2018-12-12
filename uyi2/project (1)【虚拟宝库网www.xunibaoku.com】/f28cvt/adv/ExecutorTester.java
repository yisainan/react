package interview.adv;

import java.util.LinkedList;
import java.util.List;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.Future;

import interview.designpattern.task.CodingTask;

public class ExecutorTester {

  public static void main(String[] args)
      throws InterruptedException, ExecutionException {
    ExecutorService executor = Executors.newFixedThreadPool(3);

    List<Future<?>> taskResults = new LinkedList<>();
    for (int i = 0; i < 10; i++) {
      taskResults.add(executor.submit(new CodingTask(i)));
    }
    System.out.println("10 tasks dispatched successfully.");

    for (Future<?> taskResult : taskResults) {
      taskResult.get();
    }

    System.out.println("All tasks finished.");
    executor.shutdown();
  }
}
