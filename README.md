# Angular-Modal demo application

***

## Purpose

The idea is to demonstrate how to use angular-modal API. No need to worry about the static popups. Anuglar-modal provides you a better approach to load the popup the dynamically in the DOM.
Instead of loading the templates multiple times, it will collect template from the cache.

## How to use angular-rest

* Add ngRest to main module

  ```
  angular.module('app', ['ngModal'])
  ```

* `$rest` factory will be available as a dependency injectable for all the angular services and controllers and directives as well.
  
  ```
  angular.module('app').controller('RestAPIController', ['$scope', '$modal', function($scope, $modal){

  }])
  ```

* `$modal` contains an `open` method to show popups.
  
  ```
  $modal.open({
    templateUrl: 'popup.html', 
    scope: $scope,              // Controller scope
    appendElement: 'container'  // Controller DOM element `id`
  })
  ```

* $modal provides `close` method in the current controller scope.
  
  ``` 
  <div class="modal">
    <div class="modal-heading">
      <button class="btn btn-danger btn-xs" ng-click="close()">close</button>
    </div>
  </div>
  ```

* DOM should be somethind like this.
  
  ```
  <div ng-controller="ModalAPIController">
    <table>
      <tr ng-click="showPopup(0)">
        <td>Column1</td>
        <td>Column2</td>
        <td>Column3</td>
      </tr>
    </table>
  </div>
  ```

## Stack

* Backend: [Node.js](http://nodejs.org/)
* Awesome [AngularJS](http://www.angularjs.org/) on the client
* CSS based on [Twitter's bootstrap](http://getbootstrap.com/)

## Installation

### Platform & tools

You need to install Node.js and then the development tools. Node.js comes with a package manager called [npm](http://npmjs.org) for installing NodeJS applications and libraries.
* [Install node.js](http://nodejs.org/download/) (requires node.js version >= 0.8.4)

### Get the Code

Either clone this repository or fork it on GitHub and clone your fork:

```
git clone https://github.com/Dastagirireddy/angular-modal.git
cd angular-modal/example
```

### App Server

Our backend application server is a NodeJS application that relies upon some 3rd Party npm packages.  You need to install these:

* Install local dependencies (from the project root folder):

    ```
    npm install
    ```

  (This will install the dependencies declared in the package.json file)

  ## Running
  ### Start the Server
  * Run the application server 

      ```
      node server.js
      ```
  * Browse to the application at [http://localhost:5000]

