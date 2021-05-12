# calculator

<h1>TOP Etch-a-Sketch Project</h1>

**[UNDER CONSTRUCTION!](https://el-pea.github.io/calculator/)**

[TOP - The Odin Project](https://www.theodinproject.com/faq)

Objective:</br>
Mobile friendly browser calculator that evaluates pairs of numbers

Next Features:</br>
1. Handle long numbers
    * ID largest reasonable number
    * ID what to do when that limit is reached
2. ~~Make DEL functional~~
3. Make '.' functional
4. ~~Make equals do the last operation and value entered~~
5. ~~Make every operator press but the first equals() and display() until AC~~
6. Make posNeg functional -- IN PROGRESS

Bugs</br>
1. ~~Answers that equal 0 do not update display~~
2. Hard for users to tell if it is working when the number they are operating by is also the answer. Add delay when screen updates?
3. ~~Figure out if calling equals in opKeyListener is the right move to implement Feature #5~~
4. ~~Pressing two operators in a row displays NaN because opCount is 2 so equals is invoked~~
5. ~~Pressing equals with one number in an operation that expects two displays NaN~~
6. ~~Pressing an operator than equals NaN~~
7. ~~Pressing two operators will not use the last one~~
8. posNeg displays error -- IN PROGRESS
9. Need to handle operating on a stored answer

Considerations:</br>
* I decided to break (AC, DEL, =, +/-) out of the operator logic because they aren't arithmetic operators, and stored.makeArg depends on the last operator key press
* Should display be a number field instead of a div?
* How will DEL, +/-, and '.' deal with current error handling scheme? opKeys and numKeys are disabled until AC is pressed, but these are still active
* To the last point, can my listeners go into an if(stored.error = false){} block?