GOCMD=go
GOBUILD=$(GOCMD) build
GOCLEAN=$(GOCMD) clean
GOTEST=$(GOCMD) test
GOGET=$(GOCMD) get
BINARY_NAME=cezanne
BINARY_UNIX=$(BINARY_NAME)_unix
LAMBDA_NAME=$(BINARY_NAME)_lambda

build:
	$(GOBUILD) -o $(BINARY_NAME) -v

lambda:
	GOOS=linux GOARCH=amd64 $(GOBUILD) -o $(LAMBDA_NAME) main.go
	zip $(LAMBDA_NAME).zip $(LAMBDA_NAME)

run:
	$(GOBUILD) -o $(BINARY_NAME) -v ./...
	./$(BINARY_NAME)

deps:
	$(GOGET) github.com/chromedp/chromedp
	$(GOGET) github.com/joho/godotenv
	$(GOGET) github.com/aws/aws-lambda-go

clean:
	rm $(LAMBDA_NAME)
	rm $(LAMBDA_NAME).zip
	rm $(BINARY_NAME)
