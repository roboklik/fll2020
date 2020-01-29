// MISIJA 2(JAJCA NA OKO)
brick.buttonDown.onEvent(ButtonEvent.Pressed, function () {
    motors.largeBC.setInverted(true)
    pospesevanje(20)
    motors.largeBC.tank(10, 10, 2.2, MoveUnit.Rotations)
    motors.largeC.run(30, 0.7, MoveUnit.Rotations)
    motors.largeBC.tank(100, 100, -3, MoveUnit.Rotations)
})
function vozi_ravno (cm: number) {
    sensors.gyro3.reset()
    motors.resetAll()
    while (Math.abs(motors.largeB.angle()) < 360 * (cm / 29)) {
        popravek = sensors.gyro3.angle() * 1.3
        motors.largeBC.steer(popravek, 25)
        brick.showString("Popravek", 7)
        brick.showNumber(popravek, 8)
    }
    motors.stopAll()
    motors.largeBC.setBrake(true)
}
// MISIJA 1(ŽERJAV)
brick.buttonUp.onEvent(ButtonEvent.Pressed, function () {
    motors.largeBC.setInverted(true)
    pospesevanje(30)
    vozi_ravno(20)
    motors.largeBC.tank(30, 30, 0.2, MoveUnit.Rotations)
    motors.stopAll()
})
// MISIJA 4(PUKL)
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
// MISIJA 3(ORTODONT)
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
// KALIBRIRA GYRO
brick.buttonRight.onEvent(ButtonEvent.Pressed, function () {
    sensors.gyro3.calibrate()
})
function pospesevanje (maxmoc: number) {
    while (moc < maxmoc) {
        motors.largeBC.setBrake(false)
        motors.largeBC.tank(moc, moc)
        moc = moc + 2
        control.waitMicros(30000)
    }
}
function do_crte (svetlost: number, moc: number, senzor: number) {
    motors.largeBC.setInverted(true)
    // če rabimo senzor ena
    if (senzor = 1) {
        while (sensors.color1.light(LightIntensityMode.Reflected) < svetlost) {
            motors.largeBC.tank(moc, moc)
        }
        motors.stopAll()
    }
    // če rabimo senzor dva
    if (senzor = 2) {
        while (sensors.color2.light(LightIntensityMode.Reflected) < svetlost) {
            motors.largeBC.tank(moc, moc)
        }
        motors.stopAll()
    }
}
/**
 * MISIJE
 */
/**
 * OD TU NAPREJ PODPROGRAMI
 * 
 * PODPROGRAM ZA VOŽNJO NARAVNOST
 */
/**
 * PODPROGRAM ZA POSPEŠEVANJE
 */
/**
 * PODPROGRAM ZA VOŽNJO DO ČRTE
 */
/**
 * PODPROGRAM ZA IZPIS POMEMBNIH VREDNOSTI SENZORJEV
 */
/**
 * SPREMENLJIVKE
 */
let moc = 0
let popravek = 0
let moc3 = 0
let senzor = 0
let i = 0
let svetlost = 0
forever(function () {
    brick.showString("Color 1", 1)
    brick.showNumber(sensors.color1.light(LightIntensityMode.Reflected), 2)
    brick.showString("Color 2", 3)
    brick.showNumber(sensors.color2.light(LightIntensityMode.Reflected), 4)
    brick.showString("Gyro 3", 5)
    brick.showNumber(sensors.gyro3.angle(), 6)
})
//Haj 