// V8 Engine Test Script

console.log("🎯 V8 Test Script Loaded Successfully");

// 1. Basic Execution Tests
function basicExecution() {
    console.time("Basic Calculation");
    
    const start = performance.now();
    let result = 0;
    
    // Mathematical calculations
    for (let i = 0; i < 1000000; i++) {
        result += Math.sqrt(i) * Math.sin(i);
    }
    
    const end = performance.now();
    console.timeEnd("Basic Calculation");
    
    document.getElementById('basic-result').innerHTML = `
        <strong>Basic Calculation Completed:</strong><br>
        Result: ${result.toFixed(2)}<br>
        Execution Time: ${(end - start).toFixed(2)}ms<br>
        V8 Version: ${navigator.userAgent.match(/Chrome\/(\d+)/)?.[1] || 'Unknown'}
    `;
}

function stringOperations() {
    console.time("String Operations");
    
    const start = performance.now();
    let str = "";
    
    // String concatenation test
    for (let i = 0; i < 10000; i++) {
        str += `Test string ${i} `;
    }
    
    // String processing
    const processed = str
        .split(' ')
        .filter(s => s.length > 0)
        .map(s => s.toUpperCase())
        .join('-');
    
    const end = performance.now();
    console.timeEnd("String Operations");
    
    document.getElementById('basic-result').innerHTML = `
        <strong>String Operations Completed:</strong><br>
        Original Length: ${str.length}<br>
        Processed Length: ${processed.length}<br>
        Execution Time: ${(end - start).toFixed(2)}ms
    `;
}

function arrayOperations() {
    console.time("Array Operations");
    
    const start = performance.now();
    
    // Create large array
    const arr = Array.from({length: 100000}, (_, i) => i);
    
    // Array operation chain
    const result = arr
        .filter(n => n % 2 === 0)
        .map(n => n * 2)
        .reduce((sum, n) => sum + n, 0);
    
    const end = performance.now();
    console.timeEnd("Array Operations");
    
    document.getElementById('basic-result').innerHTML = `
        <strong>Array Operations Completed:</strong><br>
        Original Array Length: ${arr.length}<br>
        Calculation Result: ${result}<br>
        Execution Time: ${(end - start).toFixed(2)}ms
    `;
}

// 2. Performance Tests
function performanceTest() {
    console.time("Performance Test");
    
    const tests = [];
    
    // Test 1: Simple loop
    let start = performance.now();
    let sum = 0;
    for (let i = 0; i < 10000000; i++) {
        sum += i;
    }
    tests.push({name: "Simple Loop", time: performance.now() - start});
    
    // Test 2: Object creation
    start = performance.now();
    const objects = [];
    for (let i = 0; i < 100000; i++) {
        objects.push({id: i, name: `object${i}`, value: Math.random()});
    }
    tests.push({name: "Object Creation", time: performance.now() - start});
    
    // Test 3: Function calls
    start = performance.now();
    function testFunc(x) { return x * x + Math.sqrt(x); }
    let funcResult = 0;
    for (let i = 0; i < 1000000; i++) {
        funcResult += testFunc(i);
    }
    tests.push({name: "Function Calls", time: performance.now() - start});
    
    console.timeEnd("Performance Test");
    
    const resultHtml = tests.map(test => 
        `${test.name}: ${test.time.toFixed(2)}ms`
    ).join('<br>');
    
    document.getElementById('performance-result').innerHTML = `
        <strong>Performance Test Results:</strong><br>
        ${resultHtml}<br>
        <strong>Memory Usage:</strong> ${(performance.memory?.usedJSHeapSize / 1024 / 1024).toFixed(2)}MB
    `;
}

function recursionTest() {
    console.time("Recursion Test");
    
    // Fibonacci sequence (recursive version)
    function fibonacci(n) {
        if (n <= 1) return n;
        return fibonacci(n - 1) + fibonacci(n - 2);
    }
    
    // Fibonacci sequence (optimized version)
    function fibonacciOptimized(n, memo = {}) {
        if (n in memo) return memo[n];
        if (n <= 1) return n;
        memo[n] = fibonacciOptimized(n - 1, memo) + fibonacciOptimized(n - 2, memo);
        return memo[n];
    }
    
    const start1 = performance.now();
    const result1 = fibonacci(35);
    const time1 = performance.now() - start1;
    
    const start2 = performance.now();
    const result2 = fibonacciOptimized(35);
    const time2 = performance.now() - start2;
    
    console.timeEnd("Recursion Test");
    
    document.getElementById('performance-result').innerHTML = `
        <strong>Recursion Performance Comparison:</strong><br>
        Normal Recursion fibonacci(35): ${result1} (${time1.toFixed(2)}ms)<br>
        Optimized Recursion fibonacci(35): ${result2} (${time2.toFixed(2)}ms)<br>
        Performance Improvement: ${(time1 / time2).toFixed(2)}x
    `;
}

function memoryTest() {
    console.time("Memory Test");
    
    const initialMemory = performance.memory?.usedJSHeapSize || 0;
    
    // Create many objects
    const largeArray = [];
    for (let i = 0; i < 500000; i++) {
        largeArray.push({
            id: i,
            data: new Array(100).fill(Math.random()),
            timestamp: Date.now()
        });
    }
    
    const afterCreation = performance.memory?.usedJSHeapSize || 0;
    
    // Clean up half of the objects
    largeArray.splice(0, 250000);
    
    // Force garbage collection (if available)
    if (window.gc) {
        window.gc();
    }
    
    const afterCleanup = performance.memory?.usedJSHeapSize || 0;
    
    console.timeEnd("Memory Test");
    
    document.getElementById('performance-result').innerHTML = `
        <strong>Memory Usage Test:</strong><br>
        Initial Memory: ${(initialMemory / 1024 / 1024).toFixed(2)}MB<br>
        After Object Creation: ${(afterCreation / 1024 / 1024).toFixed(2)}MB<br>
        After Cleanup: ${(afterCleanup / 1024 / 1024).toFixed(2)}MB<br>
        Memory Growth: ${((afterCreation - initialMemory) / 1024 / 1024).toFixed(2)}MB<br>
        Array Length: ${largeArray.length}
    `;
}

// 3. Asynchronous Operations Tests
async function promiseTest() {
    console.time("Promise Test");
    
    const start = performance.now();
    
    // Create multiple Promises
    const promises = Array.from({length: 10}, (_, i) => 
        new Promise(resolve => {
            setTimeout(() => resolve(`Promise ${i} completed`), Math.random() * 100);
        })
    );
    
    try {
        const results = await Promise.all(promises);
        const end = performance.now();
        
        console.timeEnd("Promise Test");
        
        document.getElementById('async-result').innerHTML = `
            <strong>Promise Test Completed:</strong><br>
            Executed ${promises.length} concurrent Promises<br>
            Total Time: ${(end - start).toFixed(2)}ms<br>
            Results: ${results.slice(0, 3).join(', ')}...
        `;
    } catch (error) {
        console.error("Promise test failed:", error);
    }
}

async function asyncAwaitTest() {
    console.time("Async/Await Test");
    
    async function fetchData(id) {
        // Simulate asynchronous data fetching
        await new Promise(resolve => setTimeout(resolve, 50));
        return {id, data: `Data${id}`, timestamp: Date.now()};
    }
    
    const start = performance.now();
    const results = [];
    
    // Sequential execution
    for (let i = 0; i < 5; i++) {
        const data = await fetchData(i);
        results.push(data);
    }
    
    const end = performance.now();
    console.timeEnd("Async/Await Test");
    
    document.getElementById('async-result').innerHTML = `
        <strong>Async/Await Test Completed:</strong><br>
        Sequential execution of 5 async operations<br>
        Total Time: ${(end - start).toFixed(2)}ms<br>
        Data Retrieved: ${results.length} items
    `;
}

function timerTest() {
    console.time("Timer Test");
    
    let count = 0;
    const start = performance.now();
    
    const interval = setInterval(() => {
        count++;
        if (count >= 10) {
            clearInterval(interval);
            const end = performance.now();
            console.timeEnd("Timer Test");
            
            document.getElementById('async-result').innerHTML = `
                <strong>Timer Test Completed:</strong><br>
                Executed ${count} timer callbacks<br>
                Total Time: ${(end - start).toFixed(2)}ms<br>
                Average Interval: ${((end - start) / count).toFixed(2)}ms
            `;
        }
    }, 10);
}

// 4. Error Handling Tests
function errorTest() {
    console.time("Error Test");
    
    try {
        // Intentionally throw an error
        throw new Error("This is a test error");
    } catch (error) {
        console.error("Caught error:", error.message);
        console.timeEnd("Error Test");
        
        document.getElementById('error-result').innerHTML = `
            <strong>Error Handling Test:</strong><br>
            Error Type: ${error.constructor.name}<br>
            Error Message: ${error.message}<br>
            Stack Trace: ${error.stack?.split('\n')[1] || 'None'}
        `;
    }
}

function typeErrorTest() {
    try {
        // Type error
        const obj = null;
        obj.someProperty.anotherProperty;
    } catch (error) {
        console.error("Type error:", error);
        
        document.getElementById('error-result').innerHTML = `
            <strong>Type Error Test:</strong><br>
            Error Type: ${error.constructor.name}<br>
            Error Message: ${error.message}<br>
            V8 Error Handling Working Properly
        `;
    }
}

function catchErrorTest() {
    const errors = [];
    
    // Test multiple error types
    const errorTests = [
        () => { throw new ReferenceError("Reference error"); },
        () => { throw new TypeError("Type error"); },
        () => { throw new SyntaxError("Syntax error"); },
        () => { JSON.parse("Invalid JSON"); }
    ];
    
    errorTests.forEach((test, index) => {
        try {
            test();
        } catch (error) {
            errors.push({type: error.constructor.name, message: error.message});
        }
    });
    
    document.getElementById('error-result').innerHTML = `
        <strong>Error Catching Test:</strong><br>
        ${errors.map(e => `${e.type}: ${e.message}`).join('<br>')}
    `;
}

// 5. DOM Manipulation Tests
function domManipulation() {
    console.time("DOM Operations");
    
    const container = document.getElementById('dynamic-content');
    container.innerHTML = '';
    
    const start = performance.now();
    
    // Create many DOM elements
    for (let i = 0; i < 1000; i++) {
        const div = document.createElement('div');
        div.textContent = `Dynamic Element ${i}`;
        div.style.cssText = `
            display: inline-block;
            margin: 2px;
            padding: 4px;
            background: #e9ecef;
            border-radius: 3px;
            font-size: 12px;
        `;
        container.appendChild(div);
    }
    
    const end = performance.now();
    console.timeEnd("DOM Operations");
    
    document.getElementById('dom-result').innerHTML = `
        <strong>DOM Operations Completed:</strong><br>
        Created 1000 DOM elements<br>
        Execution Time: ${(end - start).toFixed(2)}ms<br>
        Total DOM Nodes: ${document.querySelectorAll('*').length}
    `;
}

function eventTest() {
    console.time("Event Test");
    
    let clickCount = 0;
    const start = performance.now();
    
    // Create test button
    const testButton = document.createElement('button');
    testButton.textContent = 'Click Test (Click Me!)';
    testButton.onclick = function() {
        clickCount++;
        this.textContent = `Clicked ${clickCount} times`;
        
        if (clickCount >= 5) {
            const end = performance.now();
            console.timeEnd("Event Test");
            
            document.getElementById('dom-result').innerHTML = `
                <strong>Event Handling Test:</strong><br>
                Handled ${clickCount} click events<br>
                Total Time: ${(end - start).toFixed(2)}ms<br>
                Event System Working Properly
            `;
        }
    };
    
    document.getElementById('dynamic-content').appendChild(testButton);
}

// 6. V8 Features Tests
function es6Features() {
    console.time("ES6+ Features Test");
    
    const start = performance.now();
    
    // Destructuring assignment
    const [a, b, ...rest] = [1, 2, 3, 4, 5];
    
    // Arrow functions
    const multiply = (x, y) => x * y;
    
    // Template strings
    const template = `Result: ${multiply(a, b)}`;
    
    // Map and Set
    const map = new Map([['key1', 'value1'], ['key2', 'value2']]);
    const set = new Set([1, 2, 3, 3, 4, 4, 5]);
    
    // Promise
    const promise = Promise.resolve('Promise resolved');
    
    // Classes
    class TestClass {
        constructor(name) {
            this.name = name;
        }
        
        getName() {
            return this.name;
        }
    }
    
    const instance = new TestClass('V8 Test');
    
    // Symbol
    const sym = Symbol('test');
    
    const end = performance.now();
    console.timeEnd("ES6+ Features Test");
    
    document.getElementById('v8-result').innerHTML = `
        <strong>ES6+ Features Test:</strong><br>
        Destructuring: [${a}, ${b}, [${rest.join(', ')}]]<br>
        Arrow Function: ${template}<br>
        Map Size: ${map.size}, Set Size: ${set.size}<br>
        Class Instance: ${instance.getName()}<br>
        Symbol: ${sym.toString()}<br>
        Execution Time: ${(end - start).toFixed(2)}ms
    `;
}

function optimizationTest() {
    console.time("JIT Optimization Test");
    
    // Hot function - will be optimized by V8
    function hotFunction(x) {
        return x * x + x * 2 + 1;
    }
    
    // Cold start
    const coldStart = performance.now();
    let coldResult = 0;
    for (let i = 0; i < 10000; i++) {
        coldResult += hotFunction(i);
    }
    const coldTime = performance.now() - coldStart;
    
    // Warm-up run - trigger JIT optimization
    for (let i = 0; i < 100000; i++) {
        hotFunction(i);
    }
    
    // Optimized run
    const hotStart = performance.now();
    let hotResult = 0;
    for (let i = 0; i < 10000; i++) {
        hotResult += hotFunction(i);
    }
    const hotTime = performance.now() - hotStart;
    
    console.timeEnd("JIT Optimization Test");
    
    document.getElementById('v8-result').innerHTML = `
        <strong>JIT Optimization Test:</strong><br>
        Cold Start Time: ${coldTime.toFixed(2)}ms<br>
        Optimized Time: ${hotTime.toFixed(2)}ms<br>
        Performance Improvement: ${(coldTime / hotTime).toFixed(2)}x<br>
        Result Verification: ${coldResult === hotResult ? '✅ Correct' : '❌ Incorrect'}
    `;
}

function gcTest() {
    console.time("Garbage Collection Test");
    
    const initialMemory = performance.memory?.usedJSHeapSize || 0;
    
    // Create lots of temporary objects
    function createGarbage() {
        const garbage = [];
        for (let i = 0; i < 100000; i++) {
            garbage.push({
                id: i,
                data: new Array(50).fill(Math.random()),
                nested: {
                    more: new Array(20).fill('garbage')
                }
            });
        }
        return garbage.length;
    }
    
    const garbageCount = createGarbage();
    const afterGarbage = performance.memory?.usedJSHeapSize || 0;
    
    // Manually trigger garbage collection (if available)
    if (window.gc) {
        window.gc();
    }
    
    // Wait for garbage collector to work
    setTimeout(() => {
        const afterGC = performance.memory?.usedJSHeapSize || 0;
        console.timeEnd("Garbage Collection Test");
        
        document.getElementById('v8-result').innerHTML = `
            <strong>Garbage Collection Test:</strong><br>
            Initial Memory: ${(initialMemory / 1024 / 1024).toFixed(2)}MB<br>
            After Creating Garbage: ${(afterGarbage / 1024 / 1024).toFixed(2)}MB<br>
            After Garbage Collection: ${(afterGC / 1024 / 1024).toFixed(2)}MB<br>
            Objects Created: ${garbageCount}<br>
            Memory Reclaimed: ${((afterGarbage - afterGC) / 1024 / 1024).toFixed(2)}MB
        `;
    }, 1000);
}

// Page initialization when loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log("🎉 V8 Test Page Loaded Successfully");
    console.log("Browser Info:", navigator.userAgent);
    console.log("V8 Version:", navigator.userAgent.match(/Chrome\/(\d+)/)?.[1] || 'Unknown');
    
    if (performance.memory) {
        console.log("Initial Memory Usage:", (performance.memory.usedJSHeapSize / 1024 / 1024).toFixed(2), "MB");
    }
});
