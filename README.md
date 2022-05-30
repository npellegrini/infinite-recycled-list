# High performance Infinite scroll using recycling technique

**Set up instruction:**

1. Clone the repository and in the project directory run: yarn install
2. yarn start
3. yarn start

*Considerations:*

- I haven't added any Test Framework because this is a pending subject that i need to learn.
- This code is a High performance infinite scroll list , however there are things to improve, refactor and modularize it.

**Description**

I've built manually, a High performance list using the Recycling DOM technique and Scroll Anchoring, where instead of adding continually new elements to the DOM, we are reusing what already we have there. I have built also a custom Hook to handle the infinite scroll and request to the api, managing all the elements listed and the pages paginated in the API. To keep it simple i have put all the code inside the custom hook to make the call using axios, but in a real development environment i would split it up all the request into an API component where i can build my owns criteria depend on the case. Also i would added a global handling errors to the requests.


**Problems adrressed using this technique**

- Slow rendering
- Laggy scrolling
- Thousands of DOM elements on your page can crash the browser

*Side note*

Most devices refresh their screens 60 times a second. We usually want to reach 60 FPS, in order to make our app look smooth, quick and slick.
Each of those frames has a budget of just over 16ms (1 second / 60 = 16.66ms). We need to ensure that each frame will not take more than that. Because when you fail to meet this budget, the frame rate drops, and we wouldn’t give the user the experience we’re aiming for.


*Improvements to do:*

- Since we have to provide responsive webpage, this Recycling Dom Component, it should take continuaslly the sizes of the boxes to adapt the view area to render only the elements needed.
- Build a module to handle Custom API request
- Define .env variables
- Due to this list rendered is a very light list, we should take into account if we render some other heavy list we can get some gaps, or blank spots because the speed of scrolling could be faster than react rendering heavy elements, to avoid that we can use other technique to discern when the user stops scrolling and in that point render the full-element.
- Some times could happend that we have to land the user into an element that is present in other page that the first one. To allow this behavior we can implement the pagination through the url also.


Thanks for reading

Nico