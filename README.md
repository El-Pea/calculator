# calculator

<h1>TOP Etch-a-Sketch Project</h1>

**[UNDER CONSTRUCTION!](https://el-pea.github.io/calculator/)**

[TOP - The Odin Project](https://www.theodinproject.com/faq)

Objective:</br>
Mobile friendly browser calculator

Next Features:</br>
1. Handle long numbers
    * ID largest reasonable number
    * ID what to do when that limit is reached
2. Make DEL functional
3. Make '.' functional
4. ~~Make equals do the last operation and value entered~~
5. ~~Make every operator press but the first equals() and display() until AC~~
6. Make posNeg equals() when pressed

Bugs</br>
* Answers that equal 0 do not update display
* Hard for users to tell if it is working when the number they are operating by is also the answer. Add delay when screen updates?
* ~~Figure out if calling equals in opKeyListener is the right move to implement Feature #5~~
* Pressing two operators in a row displays NaN

Takeaways:</br>
* I decided to give non operators (AC, DEL, =, ...) listeners by ID because they are not arithmetic operators, and stored.makeArg depends on the last operator key press
* Consider parseFloat instead of makeFloat
