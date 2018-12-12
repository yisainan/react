package interview.oop.company;

import java.util.LinkedList;

public class Tester {
  public static void main(String[] args) {
    Employee employee1 = new Employee("John", 10000);
    Employee employee2 = new Employee("Mary", 20000);
    Employee employee3 = new Employee("John", 10000);

    System.out.println("Testing equals");
    System.out.println("employee1 == employee3 ? "
        + (employee1 == employee3));
    System.out.println("employee1.equals(employee3) ? "
        + employee1.equals(employee3));
    System.out.println("employee2.equals(employee3) ? "
        + employee2.equals(employee3));
    System.out.println();

    LinkedList<Employee> employees = new LinkedList<>();
    employees.add(employee1);
    employees.add(employee2);
    employees.add(employee3);

    System.out.println("Print using for each");
    for (Employee employee : employees) {
      System.out.println(employee);
    }
    System.out.println();

    System.out.println("Testing managers");
    Employee manager =
        new Manager("Tony", 100000, employees);
    employees.add(manager);
    for (Employee employee : employees) {
      System.out.println(employee);
    }
    System.out.println();

    System.out.println("Testing doWork");
    System.out.println("Expect exceptions because it tries to"
        + " load unmodifiable reporters.");
    manager.doWork();
  }
}
