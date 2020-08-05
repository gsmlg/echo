FROM go:alpine as builder

WORKDIR /app

COPY echo.go /app

RUN go build -o echo echo.go

FROM scratch

LABEL maintainer="GSMLG <me@gsmlg.org>"

EXPOSE 80

COPY --from=builder /app/echo /echo

ENTRYPOINT ["/echo"]
