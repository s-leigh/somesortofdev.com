provider "aws" {
 region     = var.region
 access_key = var.aws_access_key
 secret_key = var.aws_secret_key
}

locals {
  mime_types = jsondecode(file("${path.module}/data/mime.json"))
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
  required_providers {
    aws = {
      version    = "~> 4.15.1"
    }
  }
}

// S3 objects

resource "aws_s3_object" "index" {
  bucket = var.aws_s3_bucket
  acl = "public-read"
  key = "index.html"
  source = "../src/index.html"
  content_type = "text/html"
  etag = md5(file("../src/index.html"))
}

resource "aws_s3_object" "error" {
  bucket = var.aws_s3_bucket
  acl = "public-read"
  key = "error.html"
  source = "../src/error.html"
  content_type = "text/html"
  etag = md5(file("../src/error.html"))
}

#resource "aws_s3_object" "finger-exercises" {
#  bucket = var.aws_s3_bucket
#  acl = "public-read"
#  key = "static/finger-exercises.html"
#  source = "../src/static/finger-exercises.html"
#  content_type = "text/html"
#  etag = md5(file("../src/static/finger-exercises.html"))
#}

resource "aws_s3_object" "static" {
  for_each = fileset("../src/static/", "**")
  bucket = var.aws_s3_bucket
  acl = "public-read"
  key = "static/${each.value}"
  source = "../src/static/${each.value}"
  // https://engineering.statefarm.com/blog/terraform-s3-upload-with-mime/
  content_type = lookup(local.mime_types, regex("\\.[^.]+$", each.value), null)
  source_hash = filemd5("../src/static/${each.value}")
}

resource "aws_s3_object" "css" {
  bucket = var.aws_s3_bucket
  acl = "public-read"
  key = "css/style.css"
  source = "../src/css/style.css"
  content_type = "text/css"
  etag = md5(file("../src/css/style.css"))
}

resource "aws_s3_object" "scales-grade8" {
  bucket = var.aws_s3_bucket
  acl = "public-read"
  key = "js/lib/scales-grade8.js"
  source = "../src/js/lib/scales-grade8.js"
  content_type = "text/javascript"
  etag = md5(file("../src/js/lib/scales-grade8.js"))
}
