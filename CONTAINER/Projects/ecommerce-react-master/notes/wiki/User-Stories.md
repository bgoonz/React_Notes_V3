# **Stand in Content Below: Need to Replace**



## General User Not Logged In

---

As an unauthorized user, I want to be able to access reviews for books, so that I can find the worst book to read without needing an account.

## Questions

- what will unathorized users stil be able to do on the site?
  - they should be able to read reviews and comments but not create them
  - they should be able to search books
- do we want them to see other user's bookshelves if you yourself are not a user?
  - by default yes, but as a bonus feature users can set their profile to private so that only authorized users can see bookshelves

## Acceptance Criteria

- given that we are an unathorized user

  - when an unathorized user runs a search
    - then it should request information from the server on the '/search' route

- given that we are an unathorized user

  - when we select a book
    - then the server should activate the /books/:id route

# Login

---

As an unauthorized user, I want to be able to login to the website via a form, so that I can access my private information.

## Login Questions

- Will the user enter a username or an email address to login?

  - User will login via email and password.

- What routes should we use for login?

  - User will login via /login route

- Where should the user be redirected after login?

  - User will be redirected to the "/" route

- Will we allow OAuth authentication via a third party?

  - Not yet -- we haven't learned it

- What happens if the user doesn't exist yet?

  - Display the message User authentication failed. Please try again.

- What happens if the user enters the wrong password?

  - Display the message User authentication failed. Please try again.

- Should this story include allowing a user to reset their password?

  - Not yet -- maybe in a future story

- Should logging in use session-based or use token-based authentication?
  - We will use token-based authorization for now

## Login Acceptance Criteria

1. **Given** that I'm a logged-out user

   - **When** I'm on the /login route
   - **Then** there will be a login form with an email and password field and a "Login" button to submit the form.

2. **When** I try to fill out the form with an invalid email and password combination and press Enter or press the "Login" button

   - **Then** at the top of the form, I will see a message User authentication failed. Please try again.

3. **When** I try to fill out the form with an email that doesn't exist in the system and press Enter or press the "Login" button

   - **Then** at the top of the form, I will see a message User authentication failed. Please try again.

4. **When** I try to fill out the form with a valid email and password and press Enter or press the "Login" button

   - **Then** I will be redirected to the homepage at the "/" route.

5. **Given** that I am a logged-in user

   - **When** I refresh the homepage at the "/" route
   - **Then** I will still be logged in

6. **Given** that I am an unathorized user
   - **When** I am at the "/login" route
   - **Then** I can click a button to register an account at the "/register" route

# Signup

---

As an unauthorized user, I want to be able to sign up for the website via a signup form, so that I can access Bad Reads.

## Signup Questions

- Will the user enter a username and an email address to signup?

  - The user will need a username (alias) and an email address to signup

- Will we confirm their password during signup?

  - Yes. We will require the user to enter their password twice.

- What routes should we use for signup?

  - We will use "/register" route

- Where should the user be redirected after signup?

  - The user should be redirected to "/" route

- Will we allow OAuth authentication via a third party?

  - Not yet -- maybe in a future story

- What happens if the user with the username or email already exists?

  - If the username exists, the user will be prompted with a message that says "That username already exists, please choose another"
  - If the email exists, the user will be prompted with a message that says "That email already exists, please choose another"
  - The correct form fields will not reset except for the ones that drew an error

- What happens if the user enters the wrong password confirmation?
  - The user will be prompted with a message that says "Passwords must match, learn to read before proceeding. This website is lost on you."

## Signup Acceptance Criteria

1. **Given** that I'm a user who has not signed up yet and

   - **When** I'm on the /signup route
   - **Then** there will be a signup form with an email, username, and password field and a "Sign Up" button to submit the form.

2. **When** I try to fill out the form with an email or username that already exists with a valid password and press Enter or press the "Sign Up" button

   - **Then** at the top of the form, I will see a red message User with that email or username already exists.

3. **When** I try to fill out the form with a password shorter than 6 characters and press Enter or press the "Sign Up" button

   - **Then** at the top of the form, I will see a red message Password must be at least 6 characters long.

4. **When** I try to fill out the form with a valid email, username, and password and press Enter or press the "Sign Up" button

   - **Then** I will be redirected to the homepage at the / route.

5. **Given** that I am a user that just signed up
   - **When** I refresh the homepage at the / route
   - **Then** I will still be logged in

# Demo User

---

As a first-time user who just wants to demo Bluebird, I want to be able to try out the site with a demo user login via a single button click on the login and signup form, so that I can access Bluebird without having to go through the trouble of creating a new account.

## Demo User Questions

- Will the user enter a username or an email address to login?

  - User will login via email 'demo@demo.com' and password 'password'

- What routes should we use for login?

  - User will login via /login route

- Where should the user be redirected after login?

  - User will be redirected to the "/" route

- Will we allow OAuth authentication via a third party?

  - Not yet -- we haven't learned it

- What happens if the user doesn't exist yet?

  - Display the message User authentication failed. Please try again.

- What happens if the user enters the wrong password?

  - Display the message User authentication failed. Please try again.

- Should this story include allowing a user to reset their password?

  - Not yet -- maybe in a future story

- Should logging in use session-based or use token-based authentication?
  - We will use token-based authorization for now

## Demo User Acceptance Criteria

1. **Given** that I'm a logged-out user

   - **When** I'm on the /login route
   - **Then** there will be a login form with an email and password field and a "Login" button to submit the form.

2. **Given** that I am a logged-in user

   - **When** I refresh the homepage at the "/" route
   - **Then** I will still be logged in

# Logout

---

As a logged-in user, I want to logout via a button on the navigation bar, so that I can hide my account information to the rest of the users on this device.

## Logout Questions

- how will the user logout?

  - by clicking a logout button

- where will the user redirect after logging out?

  - redirect to the root '/' route as an unathorized user

## Logout Acceptance Criteria

1. **Given** that im a logged-in user

   - **When** I hit the logout button
   - **Then** the server will activate the '/logout' path and redirect to home page as unathorized user

2. **Given** that im a logged-in user

   - **When** I hit the logout button
   - **Then** the server will redirect to the root '/' route

# Books

---

## Book Questions

- who will be able to search up books?

  - everybody regardless of user authentication

- what route should we use for books?

  - link to a page about the book '/get-book/:id' from the Book Table

- what should books display?

  - image of the title, book cover(bonus), user reviews, releaseDate, pageCount, publisher, author, genre, rating, description/synopsis
    - which are all contained in the book table

- what will happen if someone searches for a book that doesnt exist?

  - will display custom error message 'this book does not exist'

## Book Acceptance Criteria

1. **Given** that a user wants to find a book

   - when the book is searched for and it exists
   - then the book will show up in search results

2. **Given** that a user wants to find a book

   - when the book is opened
   - then it will display the pertinent information such as title, user reviews, releaste date, page count, author, genre, rating, description

3. **Given** that a uses searches for a book that doesnt exist

   - when the book is searched for
   - then a error message saying the book does not exist shows up instead of a book

# Bookshelves

---

## Bookshelf Questions

- who will be able to access bookshelves

  - authenticated users

- what route should we use for bookshelves?

  - link to a /get-user-books/:userId

- what should bookshelves display?

  - the books that you save or mark as well as the user's ratings, 'read' status, reviews and optionally date read

- what will happen if user wants to delete a book off their bookshelf?

  - when deleted, the website will send a delete request

- what will happen if user wants to edit or change shelf or change rating of a book off their bookshelf?

  - the website will do a patch request

- what will happen if user adds a book to their bookshelf?

  - the website will use a post(?) request to connect the book to their bookshelf

- what if users want to organize their books by category or shelf?

  - the database will SELECT (all books) ORDER BY (category or shelf or genre or etc)

## Bookshelf Acceptance Criteria

1. **Given** that a user wants to add a book to their bookshelf

   - when the book is added to bookshelf
   - then the website does a patch(?) request

2. **Given** that a user wants to access their bookshelf

   - when the user clicks on their bookshelf link
   - then the website redirects to /get-user-books/:userId

3. **Given** that a user wants to delete a book off of their bookshelf

   - when the user deletes the book they no longer want from their bookshelf
   - then badreads will make a delete request and delete that book from the bookself

4. **Given** that a user wants to edit their rating/review/shelf

   - when the user tries to delete any of these things
   - then the bookshelf will patch the new information over the existing information displayed on the bookshelf

5. **Given** that a user wants to sort their books by rating/shelf

   - when the user sorts the bookshelf by these criteria
   - then SELECT (all books) ORDER BY (rating/shelf)

# Ratings

---

## Rating Questions

- who will be able to create ratings

  - authenticated users only

- where will ratings be displayed?

  - ratings will be displayed on user bookshelves or displayed on the individual book (bookId)

- how will ratings be scaled?

  - on a scale of 1-5 stars averaged to the nearest whole star

## Rating Acceptance Criteria

1. **Given** that a user wants to create a rating for a book

   - when a user creates a rating for a book
   - then a rating will be created and the book is added to the user's bookshelf if it doesn't already exist

2. **Given** that someone wants to see reviews about a book

   - when that someone goes to the book page
   - then the average ratings

# Reviews

---

As a user who wants to share my opinion on the quality of bad books, I want to be able to leave a review about books that I have read, so I can engage with the community of bad books readers.

## Review Questions

- Who will be able to create reviews about bad books?
  - Authorized users will be able to create reviews about books they have read.
- Where will reviews be displayed
  - They will be displayed on the books page and on the individual users bookshelf.
- When you leave a review how long can it be?
  - No character limit on reviews.
- Are we moderating comments?
  - No Cursing. (bonus feature to implement profanity filter)
- How do you submit a review?
  - By pressing a submit button.
- After posting a review can you edit or delete it.
  - Yes, through an option on your personal page.
- What order should reviews be listed in?
  - They should be listed in most recent descending.
  - Add other options to sort reviews as a bonus feature.

## Review Acceptance Criteria

1. **Given** that the user wants to leave a review
   - **when** they create a review
   - **then** app.post() that method to the server and append the review to the list of reviews for the book as well as the users bookshelf.
2. **Given** that the user has not read a book
   - **when** the user wants to review that book
   - **then** they cannot review that book. (or add a bonus feature that labels them a reviewer by book cover)
3. **Given** when a user posts a review
   - **when** that user tries to include forbidden language
   - **then** that review will not be posted.
4. **Given** when a user reports a comment
   - **when** 10 unique users report that comment
   - **then** that comment is removed.
