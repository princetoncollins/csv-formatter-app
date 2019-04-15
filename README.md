<h1>CSV String Formatter App</h1>

This is a <b>Node.js</b> application with a <b>Vue.js</b> front end interface that allows the end user to enter into a text-area input a CSV string delimited by carriage returns(e.g. <b>\r\n</b> or <b>\n</b>), and returns a formatted CSV string where each header in the header row and each corresponding data field in each data field row is wrapped in square brackets, like so:

<b>[Header1]</b> or <b>[DataField1]</b>

rather than double quotes, like so:

<b>"Header1"</b> or <b>"DataField1"</b>

The string is then rendered in CSV-like format to the Vue.js front end.

<b>To use:</b><br>
- <code><b>git clone</b></code> into desired folder location.
- Get and install required npm module dependencies with <code><b>npm install</b></code><br>
- Run with <code><b>node src/app.js</b></code>
