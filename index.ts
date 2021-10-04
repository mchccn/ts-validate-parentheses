type Increment<X extends number> = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65][X];

type ActualValidateParentheses<
  S extends string,
  Stack extends unknown[] = [],
  Index extends number = 0,
  Errors extends unknown[] = [],
> = S extends `${infer Char}${infer Rest}`
  ? Char extends "("
    ? ActualValidateParentheses<Rest, [...Stack, Index], Increment<Index>, Errors>
    : Char extends ")"
      ? Stack["length"] extends 0
        ? ActualValidateParentheses<Rest, Stack, Increment<Index>, [...Errors, Index]>
        : Stack extends [...infer First, infer _]
          ? ActualValidateParentheses<Rest, First, Increment<Index>, Errors>
          : never
      : ActualValidateParentheses<Rest, Stack, Increment<Index>, Errors>
  : Stack["length"] extends 0
    ? Errors
    : [...Errors, ...Stack];

type ToErrorMessage<A> = A extends [infer I, ...infer Rest] ? I extends number ? [`Mismatched parentheses at index ${I}.`, ...ToErrorMessage<Rest>] : ToErrorMessage<Rest> : A;

type ValidateParentheses<S extends string> = ToErrorMessage<ActualValidateParentheses<S>>["length"] extends 0 ? "Valid parentheses." : ToErrorMessage<ActualValidateParentheses<S>>;
