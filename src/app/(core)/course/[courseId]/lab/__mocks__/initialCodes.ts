import type { LanguageMap } from "../store/editor";

export const initialsCodes: LanguageMap = {
  c: `#include <stdio.h>
int main() {
    printf("Hello, World!");
    return 0;
}`,
  cpp: `#include <iostream>
using namespace std;
int main() {
    cout << "Hello, World!";
    return 0;
}`,
  java: `public class Main {
    public static void main(String[] args) {
	System.out.println("Hello, World!");
    }
}`,
  python: `print("Hello, World!")`,
  javascript: `console.log("Hello, World!");`,
  typescript: `console.log("Hello, World!");`,
  ruby: `puts "Hello, World!"`,
  swift: `print("Hello, World!")`,
  go: `package main
import "fmt"
func main() {
    fmt.Println("Hello, World!")
}`,
};
