// MISIJA 3(JAJCA NA OKO)
brick.buttonDown.onEvent(ButtonEvent.Pressed, function () {
    motors.largeBC.setInverted(true)
    pospesevanje(20)
motors.largeBC.tank(10, 10, 2.2, MoveUnit.Rotations)
    motors.largeC.run(30, 0.7, MoveUnit.Rotations)
    motors.largeBC.tank(100, 100, -3, MoveUnit.Rotations)
})
// MISIJA 1()
brick.buttonUp.onEvent(ButtonEvent.Pressed, function () {
    motors.largeBC.setInverted(true)
    pospesevanje(50)
vozi_ravno(40)
do_crte(90, 30, 2)
motors.stopAll()
    control.waitMicros(1000)
    motors.mediumD.run(30, -2.2, MoveUnit.Rotations)
    motors.largeBC.tank(25, 25, -0.2, MoveUnit.Rotations)
    control.waitMicros(2000000)
    for (i = 0; i < 18; i++) {
        motors.mediumA.run(100, -0.3, MoveUnit.Rotations)
        control.waitMicros(20000)
        motors.mediumA.run(100, 0.3, MoveUnit.Rotations)
        control.waitMicros(20000)
    }
motors.mediumA.run(100, -1, MoveUnit.Rotations)
    motors.largeBC.tank(30, 30, -0.1, MoveUnit.Rotations)
    motors.mediumD.run(30, 3, MoveUnit.Rotations)
    motors.largeBC.tank(30, 30, -0.2, MoveUnit.Rotations)
    motors.largeC.run(50, -0.25, MoveUnit.Rotations)
    motors.mediumA.run(100, -3, MoveUnit.Rotations)
    motors.largeBC.tank(30, 30, 0.2, MoveUnit.Rotations)
    motors.largeB.run(10, -0.3, MoveUnit.Rotations)
    motors.largeBC.tank(10, 10, 0.9, MoveUnit.Rotations)
    motors.largeBC.tank(30, 30, -1, MoveUnit.Rotations)
    motors.largeC.run(30, 1, MoveUnit.Rotations)
    motors.largeBC.tank(100, 100, -2.5, MoveUnit.Rotations)
})
// MISIJA 5(PUKL)
brick.buttonLeft.onEvent(ButtonEvent.Pressed, function () {
    motors.largeBC.setInverted(true)
    motors.largeBC.tank(30, 30, -3.7, MoveUnit.Rotations)
    motors.mediumA.run(100, 0.8, MoveUnit.Seconds)
    motors.largeB.run(30, 0.25, MoveUnit.Rotations)
    motors.largeBC.tank(30, 30, -0.9, MoveUnit.Rotations)
    motors.largeBC.tank(30, 1, MoveUnit.Rotations)
    do_crte(90, 30, 1)
control.waitMicros(200000)
    motors.largeB.run(30, -0.9, MoveUnit.Rotations)
    motors.largeBC.tank(30, 30, 2.4, MoveUnit.Rotations)
})
// MISIJA 2(ORTODONT)
brick.buttonEnter.onEvent(ButtonEvent.Pressed, function () {
    motors.largeBC.setInverted(true)
    pospesevanje(25)
motors.largeBC.tank(25, 25, 1.8, MoveUnit.Rotations)
    motors.mediumD.run(25, 2, MoveUnit.Rotations)
    motors.largeBC.tank(10, 10, 1, MoveUnit.Rotations)
    motors.mediumD.run(25, -1, MoveUnit.Rotations)
    motors.largeBC.steer(-41, 30, 0.5, MoveUnit.Rotations)
    motors.largeBC.steer(41, 30, 0.5, MoveUnit.Rotations)
    do_crte(90, 30, 2)
motors.mediumD.run(100, -2, MoveUnit.Rotations)
    motors.largeBC.tank(30, 30, 1, MoveUnit.Rotations)
})
// MISIJA 4(GIGANTSKI STOLP)
brick.buttonRight.onEvent(ButtonEvent.Pressed, function () {
    motors.largeBC.setInverted(true)
    motors.largeBC.tank(30, 30, 3, MoveUnit.Rotations)
    motors.largeBC.tank(100, 100, -3.5, MoveUnit.Rotations)
})
let popravek = 0
let moc = 0
let svetlost = 0
let i = 0
let senzor = 0
let moc3 = 0
sensors.gyro3.calibrate()
function pospesevanje(maxmoc: number) { // na vrhu napišeš do katere moči mora pospeševati. 
    while (moc < maxmoc) {
        motors.largeBC.setBrake(false)
        motors.largeBC.tank(moc, moc) //Moč motorjev natavi na 0. 
        moc = moc + 2 //Nato pa pospeši za dva. 
        control.waitMicros(30000) // počaka 30000 mikrosekunde( to je 0.03 sekunde) in nato vse spet ponovi. 
        // To dela dokler ni pospešil do dane moči ki smo jo prej napisali. 
    }
}
function vozi_ravno(cm: number) {//zgor napišeš koliko cm naj pelje
    motors.resetAll()//resetira vse motorje
    while (Math.abs(motors.largeB.angle()) < 360 * (cm / 29)) {//zračuna cm
        popravek = sensors.gyro3.angle() * 1.5 //popravek je enak kotu gyro senzorja 3
        motors.largeBC.steer(popravek, 25)//kot popravka napiše not in vozi z močjo 30
        brick.showString("Popravek", 7)
        brick.showNumber(popravek, 8)//na koci pokaže popravek

    }
    motors.stopAll()
    motors.largeBC.setBrake(true)
}
function do_crte(svetlost: number, moc: number, senzor: number) {
    motors.largeBC.setInverted(true)
    //če rabimo senzor ena
    if (senzor = 1) {
        while (sensors.color1.light(LightIntensityMode.Reflected) < svetlost) {
            motors.largeBC.tank(moc, moc)
        }
        motors.stopAll()
    }
    //če rabimo senzor dva
    if (senzor = 2) {
        while (sensors.color2.light(LightIntensityMode.Reflected) < svetlost) {
            motors.largeBC.tank(moc, moc)
        }
        motors.stopAll()
    }
}
forever(function () {
    brick.showString("Color 1", 1)
    brick.showNumber(sensors.color1.light(LightIntensityMode.Reflected), 2)
    brick.showString("Color 2", 3)
    brick.showNumber(sensors.color2.light(LightIntensityMode.Reflected), 4)
    brick.showString("Gyro 3", 5)
    brick.showNumber(sensors.gyro3.angle(), 6)
})
