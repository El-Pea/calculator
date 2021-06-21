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
3. ~~Make '.' functional~~
4. ~~Make equals do the last operation and value entered~~
5. ~~Make every operator press but the first equals() and display() until AC~~
6. ~~Make posNeg functional~~ 

Bugs</br>
1. Decimal point doesn't display until decimal pressed. Likely because of parseFloat() in calc.joinInputArray(). Consider scrapping this method and using join() where applicable but pay attention to where the program is currently expecting a number type
2. Can't start an op with a decimal
3. Large numbers blowout div
4. Slow on mobile


