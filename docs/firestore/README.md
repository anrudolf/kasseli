# Firestore security rules

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // public collections
    match /tills/{till} {
    	allow read, write: if true;
    }

    match /images/{image} {
    	allow read, write: if true;
    }

    match /products/{product} {
    	allow read, write: if true;
    }

    match /appPayments/{appPayment} {
      allow read, write: if true;
    }

    // collection group: members
    match /{path=**}/members/{member} {
      // TODO: maybe only allow self search?
    	allow read: if true;
    }

    // workspaces
    match /workspaces/{workspace} {
    	function isAllowedToEditWorkspace() {
        return (request.auth != null) &&
          ((resource.data['creator'] == request.auth.uid) || exists(/databases/$(database)/documents/workspaces/$(workspace)/members/$(request.auth.uid)));
      }

      function isAllowedToAddSelfToMembers() {
        return (request.auth != null) &&
          (request.resource.id == request.auth.uid) &&
          (get(/databases/$(database)/documents/workspaces/$(workspace)).data.creator == request.auth.uid);
      }

      function isAllowedToEditSubcollections() {
        return (request.auth != null) &&
          (get(/databases/$(database)/documents/workspaces/$(workspace)).data.creator == request.auth.uid ||
          	exists(/databases/$(database)/documents/workspaces/$(workspace)/members/$(request.auth.uid))
          );
      }

      allow read: if true;
      // allow create if signed in and creator field is uid
      allow create: if request.auth != null && request.resource.data['creator'] == request.auth.uid
      // allow update if member, and only name is changed
      allow update: if isAllowedToEditWorkspace() && request.resource.data.diff(resource.data).affectedKeys().hasOnly(['name'])

      match /members/{member} {
        // TODO: allow from invites
      	allow read, write: if isAllowedToAddSelfToMembers();
      }

      match /tills/{till} {
        allow read: if true;
        allow write: if isAllowedToEditSubcollections();
    	}

      match /images/{image} {
        allow read: if true;
        allow write: if isAllowedToEditSubcollections();
    	}

      match /products/{product} {
        allow read: if true;
        allow write: if isAllowedToEditSubcollections();
    	}
    }
  }
}
```
