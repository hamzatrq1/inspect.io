

There are two collectors: the Java collector (`inspect-core`) and the Angular collector (`inspect-ng-collector`).

## INSPECT-Core

The `inspect-core` module is the Java library for collecting traces on the application side.

It is designed to instrument Java or Spring applications. It captures:
- logical sessions,
- HTTP, JDBC, LDAP, FTP, SMTP, and local requests,
- thread contexts to maintain correlation between asynchronous tasks,
- resource metrics,
- errors and exceptions,
- correlation between operations.

It is therefore the technical component that allows recording events at the application level and transmitting them to the INSPECT server.

`inspect-core` is a technical and functional collection engine for Java applications. It is designed to:
- open a logical session,
- record associated requests,
- associate context information by thread,
- manage asynchronous tasks in a correlated manner,
- send traces remotely or store them locally.

The key concepts are:
- Session: logical unit of execution,
- Request: underlying operation or system call,
- TraceSignal / TraceUpdate: capture at the beginning and end of an operation,
- Thread-local context: logic for propagating context across threads.

This allows reconstructing the path of a process, even in a distributed or asynchronous environment.

____

## INSPECT-NG-Collector

The `inspect-ng-collector` module is the Angular front-end library for collecting traces.
Its role is to monitor what happens in the browser or in an Angular application:
- navigation and route changes, 
- user interactions,
- HTTP requests,
- global errors,
- application performance,
- custom application events.

It automates the collection of traces useful for understanding user behavior and functional experience.

`inspect-ng-collector` is designed as an Angular module that activates at the root of an application. It can:
- automatically collect user actions,
- trace outgoing HTTP calls,
- capture route changes,
- record global errors,
- measure application performance,
- collect custom application events.

This library makes the front layer more observable and allows understanding the user experience and the functional behavior of the application.


