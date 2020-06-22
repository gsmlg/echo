package main

import (
    "net/http"
    "log"
    "io"
    "io/ioutil"
    "time"
    "fmt"
)

func myHandler (w http.ResponseWriter, r *http.Request) {
    str := fmt.Sprintf("%s %s\r\n", r.Method, r.URL)
    io.WriteString(w, str)
    for k,v := range(r.Header) {
        str := fmt.Sprintf("%s: %s\r\n", k, v)
        io.WriteString(w, str)
    }
    io.WriteString(w, "\r\n")

    body, err := ioutil.ReadAll(r.Body)
    if err != nil {
        log.Printf("Error reading body: %v", err)
        http.Error(w, "can't read body", http.StatusBadRequest)
        return
    }
    w.Write(body)
}

func main() {

    s := &http.Server{
        Addr:           ":80",
        Handler:        http.HandlerFunc(myHandler),
        ReadTimeout:    10 * time.Second,
        WriteTimeout:   10 * time.Second,
        MaxHeaderBytes: 1 << 20,
    }

    log.Fatal(s.ListenAndServe())

}
