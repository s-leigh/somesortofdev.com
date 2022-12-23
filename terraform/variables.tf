variable "region" {
  description = "Region (default Ireland)"
  default = "eu-west-1"
}

variable "aws_s3_bucket" {
  description = "AWS static root bucket name"
  default = "somesortofdev.com"
}

variable "main_bucket" {
  default = "somesortofdev.com"
}

variable "aws_access_key" {
  description = "AWS Access Key"
}

variable "aws_secret_key" {
  description = "AWS Secret Key"
}
