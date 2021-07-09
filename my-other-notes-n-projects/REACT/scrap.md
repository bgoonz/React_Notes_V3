  #!/bin/sh
# find ./ | grep -i "\.*$" >files
find ./ | sed -E -e 's/([^ ]+[ ]+){8}//' | grep -i "\.*$">files
listing="files"
out=""
html="index.html"
out="basename $out.html"
html="index.html"
cmd() {
  echo '  <!DOCTYPE html>'
  echo '<html>'
  echo '<head>'
  echo '  <meta http-equiv="Content-Type" content="text/html">'
  echo '  <meta name="Author" content="Bryan Guner">'
  echo '<link rel="stylesheet" href="./assets/prism.css">'
  echo ' <link rel="stylesheet" href="./assets/style.css">'
  echo ' <script async defer src="./assets/prism.js"></script>'
  echo "  <title> directory </title>"
  echo ""
  echo '  <meta http-equiv="Content-Type" content="text/html"> '
echo '  <meta name="Author" content="Bryan Guner"> '
echo '  <link rel="stylesheet" href="./assets/prism.css"> '
echo '  <link rel="stylesheet" href="./assets/style.css"> '
echo '  <script async defer src="./prism.js"></script> '
echo '  <script async defer src="./assets/prism.js"></script> '
echo '  <title> directory </title> '
echo '  <link rel="stylesheet" href="./style.css"> '
echo '  <link rel="stylesheet" href="./prism.css"> '
echo '  <link href="https://myCDN.com/prism@v1.x/themes/prism.css" rel="stylesheet" /> '
echo '  <script async defer src="https://myCDN.com/prism@v1.x/components/prism-core.min.js"></script> '
echo '  <script async defer src="https://myCDN.com/prism@v1.x/plugins/autoloader/prism-autoloader.min.js"></script> '
  echo '<style>'
echo '  <style> '
echo '    a { '
echo '      color: black; '
echo '    } '
echo ' '
echo '    li { '
echo '      border: 2px solid black !important; '
echo '      font-size: 16px; '
echo '      letter-spacing: 0px; '
echo '      font-weight: 700; '
echo '      line-height: 12px; '
echo '      text-decoration: none !important; '
echo '      text-transform: uppercase; '
echo '      background: #194ccdaf !important; '
echo '      color: black !important; '
echo '      border: none; '
echo '      cursor: pointer; '
echo '      justify-content: center; '
echo '      padding: 40px 60px; '
echo '      height: 55px; '
echo '      text-align: center; '
echo '      white-space: normal; '
echo '      border-radius: 8px; '
echo '      min-width: 50em; '
echo '      padding: 1.4em 1.4em 0; '
echo '      box-shadow: 0 0 5px; '
echo '      margin: 1em; '
echo '      display: grid; '
echo '      -webkit-border-radius: 10px; '
echo '      -moz-border-radius: 10px; '
echo '      -ms-border-radius: 10px; '
echo '      -o-border-radius: 10px; '
echo '    } '
echo '  </style> '
echo '  <link rel="stylesheet" href="./toc.css"> '
echo '  <script async defer src="./toc.js"></script> '
echo '  <script async defer> '
echo '    function copyToClipboard( text ) { '
echo '      var input = document.body.appendChild( document.createElement( "input" ) ); '
echo '      input.value = text; '
echo '      input.focus(); '
echo '      input.select(); '
echo '      document.execCommand( 'copy' ); '
echo '      input.parentNode.removeChild( input ); '
echo '    }; '
echo '  </script> '
echo '</head> '
echo '<body language-js> '
  echo ""
  #################### continue with the HTML stuff:
  echo ""
  echo ""
  echo "<ul>"
  awk '{print "<li><a href=\""$1"\">",$1,"&nbsp;</a></li>"}' $listing
  # awk '{print "<li>"};
  #   {print " <a href=\""$1"\">",$1,"</a></li>&nbsp;"}' \ $listing
  echo ""
  echo "</ul>"
  echo "</body>"
  echo "</html>"
}
cmd $listing --sort=extension >>$html









  <!DOCTYPE html>
<html>
<head>
  <meta http-equiv="Content-Type" content="text/html">
  <meta name="Author" content="Bryan Guner">
  <title> directory </title>

  <meta http-equiv="Content-Type" content="text/html"> 
  <meta name="Author" content="Bryan Guner"> 
  <title> directory </title> 
<style>
  <style> 
    a { 
      color: black; 
    } 
 
    li { 
      border: 2px solid black !important; 
      letter-spacing: 0px; 
      line-height: 12px; 
      text-decoration: none !important; 
      text-transform: uppercase; 
      background: #194ccdaf !important; 
      color: black !important; 
      border: none; 
      cursor: pointer; 
      justify-content: center; 
      padding: 40px 60px; 
      height: 55px; 
      text-align: center; 
      white-space: normal; 
      border-radius: 8px; 
      min-width: 50em; 
      padding: 1.4em 1.4em 0; 
      box-shadow: 0 0 5px; 
      margin: 1em; 
      display: grid; 
      -webkit-border-radius: 10px; 
      -moz-border-radius: 10px; 
      -ms-border-radius: 10px; 
      -o-border-radius: 10px; 
    } 
  </style> 
  <script async defer> 
    function copyToClipboard( text ) { 
      var input = document.body.appendChild( document.createElement( "input" ) ); 
      input.value = text; 
      input.focus(); 
      input.select(); 
      document.execCommand( copy ); 
      input.parentNode.removeChild( input ); 
    }; 
  </script> 
</head> 
<body language-js> 

