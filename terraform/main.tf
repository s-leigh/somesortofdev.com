provider "aws" {
 region     = "${var.region}"
 version    = "~> 2.6"
 access_key = "${var.aws_access_key}"
 secret_key = "${var.aws_secret_key}"
}

provider "template" {
  version = "~> 2.1"
}

// TF remote state
// terraform init -backend-config="access_key=..." -backend-config="secret_key=..."
terraform {
  backend "s3" {
    bucket = "ssod-config"
    key = "terraform.tfstate"
    region = "eu-west-1"
    encrypt = true
  }
}

// S3 objects

resource "aws_s3_bucket_object" "index" {
  bucket = "${var.aws_s3_bucket}"
  acl = "public-read"
  key = "index.html"
  source = "../src/index.html"
  content_type = "text/html"
  etag = "${md5(file("../src/index.html"))}"
}

resource "aws_s3_bucket_object" "scales-grade8" {
  bucket = "${var.aws_s3_bucket}"
  acl = "public-read"
  key = "js/lib/scales-grade8.js"
  source = "../src/js/lib/scales-grade8.js"
  content_type = "text/javascript"
  etag = "${md5(file("../src/js/lib/scales-grade8.js"))}"
}

resource "aws_s3_bucket_object" "error" {
  bucket = "${var.aws_s3_bucket}"
  acl = "public-read"
  key = "error.html"
  source = "../src/error.html"
  content_type = "text/html"
  etag = "${md5(file("../src/error.html"))}"
}
