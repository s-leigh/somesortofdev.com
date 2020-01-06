variable "region" {
  description = "Ireland"
  default = "eu-west-1"
}

variable "aws_s3_bucket" {
  description = "AWS static root bucket name"
  default = "somesortofdev.com"
}

variable "main_bucket" {
  default = "somesortofdev.com"
}
