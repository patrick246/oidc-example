package main

import (
	"flag"
	"fmt"
	"net/http"
)

var folder = flag.String("folder", ".", "Folder to serve on :8081")

func main() {
	fmt.Println("listening on http://0.0.0.0:8081")
	http.ListenAndServe(":8081", http.FileServer(http.Dir(".")))
}
