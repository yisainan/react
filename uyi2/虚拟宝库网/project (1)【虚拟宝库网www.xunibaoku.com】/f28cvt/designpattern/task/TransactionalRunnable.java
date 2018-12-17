package interview.designpattern.task;

public class TransactionalRunnable implements Runnable {

  private final Runnable innerRunnable;

  public TransactionalRunnable(Runnable innerRunnable) {
    this.innerRunnable = innerRunnable;
  }

  @Override
  public void run() {
    boolean shouldRollback = false;
    try {
      beginTransaction();
      innerRunnable.run();
    } catch (Exception e) {
      shouldRollback = true;
      throw e;
    } finally {
      if (shouldRollback) {
        rollback();
      } else {
        commit();
      }
    }
  }

  private void commit() {
    System.out.println("commit");
  }

  private void rollback() {
    System.out.println("rollback");
  }

  private void beginTransaction() {
    System.out.println("beginTransaction");
  }
}
