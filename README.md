# movie_watchlist
Another solo project from Scrimba -- involving CSS and API

Here is the screenshot of the visual prototype:

![ALT board_image](./movie_list.png)


Key learning points:

Nevigate from one page to another 
At the moment, I used anchor tags to  switch betwen two pages, but I'm
not so sure if this machanism will work when it's hosted. I'm aware of the use of 
"window.locaton.href" method. That's another option if the current method doesn't work
when it's deployed. 

Using localStorage and rendering the stored data
Saving data on one page and retrieving them on another proved to be a bit tricky. I used
conditonals to detact if a second page is present, if yes, the data is retrieved and rendered 
to the second page. There are quite a few actions for showing and hiding some messages. I struggled
a bit to figure out the logics of arraning various messages properly, partly because they appeared 
in two seperate pages. 

Layout
I spent lots of time trying to imitate the prototyp images on Figma. Figma made my life a lot easier by
showing all the fonts, colors, margins and paddings required. Obviously, my job was not as simple as
merely doing a lot of tedious copy and paste actions.  The realy challengs lie in using Flex box to build
the layout and align and group various small elements together. 







