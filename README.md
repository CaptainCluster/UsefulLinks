# UsefulLinks
This program contains a bunch of links that I consider useful in their own ways. One of the things
I wanted to experiment with this was trying to make a good piece of software, while keeping the 
HTML page minimalist. 

The links are stored as objects in a JSON file. These objects will then be fetched from that file
and processed, allowing them to be displayed in the HTML page in a way they're automatically
organized.

Customizability
---
Despite the fact that I have put my own links in the program, there are ways for other people
to customize it by adding their own links. The program comes with a tool that allows the user
to create their own Link objects. 

This tool utilizes NodeJs and can be used by typing the 
following command in the terminal:

```node src/data/links.js```
