package main

import (
	"bufio"
	"fmt"
	"log"
	"net"
)

func handleConn(conn net.Conn) {
	defer conn.Close()

	fmt.Println("Incoming connection from " + 
		conn.RemoteAddr().String())

	input := bufio.NewScanner(conn)

	for input.Scan() {
		fmt.Fprintln(conn, "Hello " + input.Text() + ".")
	}
}

func main() {
	listener, err := net.Listen("tcp", "localhost:9999")
	if err != nil {
		log.Fatal(err)
	}
	defer listener.Close()

	for {
		conn, err := listener.Accept()
		if err != nil {
			log.Print(err)
			continue
		}
		go handleConn(conn)
	}
}
