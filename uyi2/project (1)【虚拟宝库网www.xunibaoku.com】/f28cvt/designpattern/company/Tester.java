package interview.designpattern.company;

import java.util.Arrays;
import java.util.LinkedList;

public class Tester {
  public static void main(String[] args) {
    Employee employee1 = new Employee("John", 10000,
        new Engineer());
    Employee employee2 = new Employee("Mary", 20000,
        new Engineer());

    LinkedList<Employee> employees = new LinkedList<>();
    employees.add(employee1);
    employees.add(employee2);

    System.out.println("Print using for each");
    for (Employee employee : employees) {
      System.out.println(employee);
    }

    System.out.println("Testing managers");
    employee2.setRole(new Manager(Arrays.asList(employee1)));
    for (Employee employee : employees) {
      System.out.println(employee);
    }

    System.out.println("Testing doWork");
    System.out.println("Employee1");
    employee1.doWork();
    System.out.println("Employee2");
    employee2.doWork();
  }
}
