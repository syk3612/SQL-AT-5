const contentBox = document.getElementById("content-box");

function showSelectLesson() {
    contentBox.innerHTML = `
        <div class="lesson-box">
            <h1>SELECT Statement - Toys Example 🎁</h1>
            <p>
                Imagine you have a <strong>big toy box</strong> 🧸 with many toys:
                cars 🚗, dolls 👧, balls ⚽.
            </p>
            <p>
                The <code>SELECT</code> statement is like saying:
                <em>"I only want to see the cars from my toy box."</em>
            </p>
            <h3>In SQL, it looks like this:</h3>
            <pre>
SELECT cars
FROM toy_box;
            </pre>
            <p>
                This tells the database:
                <strong>"Show me only the cars from the toy_box."</strong>
            </p>
            <h3>Another Example:</h3>
            <pre>
SELECT dolls
FROM toy_box;
            </pre>
            <p>
                Now you are asking to see only the dolls 👧.
            </p>
        </div>
    `;
}
