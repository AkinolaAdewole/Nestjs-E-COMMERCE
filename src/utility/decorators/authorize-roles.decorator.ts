import { SetMetadata } from '@nestjs/common';

export const AuthorizeRoles = (...roles: string[]) => SetMetadata('allowedRoles', roles);

// The SetMetadata decorator is typically used in NestJS applications to attach 
// metadata to a class, method, or parameter. This metadata can then be retrieved 
// and used by NestJS's runtime.

// This line defines a new TypeScript constant AuthorizeRoles.
// It's using TypeScript's arrow function syntax (() =>) to define a function.
// The function AuthorizeRoles accepts an array of strings (...roles: string[]). 
// This syntax represents a rest parameter, allowing the function to accept any 
// number of arguments, which will be collected into an array named roles.
// Inside the function body, it calls SetMetadata('allowedRoles', roles).
// This sets metadata with the key 'allowedRoles' and the provided roles array.
// This metadata can then be accessed and utilized elsewhere in the application, 
// perhaps in a custom NestJS guard or interceptor, to control access based on the 
// roles specified.
// Overall, this code defines a custom decorator named AuthorizeRoles, which can 
// be used to attach metadata about the roles authorized to access a particular 
// resource or route within a NestJS application.
