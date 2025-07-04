function test1() {
    const data = [
        {Thing1: 1, Thing2: 2, Thing3: 3},
        {Thing1: 1, Thing2: 2, Thing3: 3},
        {Thing1: 1, Thing2: 2, Thing3: 3},
        {Thing1: 1, Thing2: 2, Thing3: 3}
    ]


    const values = data.map((log, i) => [
        log.Thing3, log.Thing1, log.Thing2, i
    ])

    console.log(values)
}

function test2() {
    const alias_log = [{ "2256503": "1", "a": "b" }, { "22503": "2" }];

    const parsed = alias_log.map((entry, index) => {
        const [userId, alias] = Object.entries(entry)[0];
        return [parseInt(userId), alias, index];
    });

    const testVar = Object.entries(alias_log[0])

    console.log(parsed)
}

function test3() {
    const d = new Date()

    console.log(d.getUTCMonth())
}



// test1()
// test2()
test3()