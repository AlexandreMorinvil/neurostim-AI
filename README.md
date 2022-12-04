<h1 class="code-line" data-line-start=1 data-line-end=2 ><a id="NeuralDrive_1"></a>NeuralDrive</h1>
<h5 class="code-line" data-line-start=2 data-line-end=3 ><a id="Polytechnique_Montreal_Aut_2022_2"></a>Polytechnique Montreal Aut 2022</h5>
<p class="has-line-data" data-line-start="3" data-line-end="4">Documentation du projet NeuralDrive</p>
<h2 class="code-line" data-line-start=4 data-line-end=5 ><a id="Prrequis_4"></a>Prérequis</h2>
<ul>
<li class="has-line-data" data-line-start="5" data-line-end="6">[Linux operating system]</li>
<li class="has-line-data" data-line-start="6" data-line-end="7"><a href="https://developer.android.com/studio">Android Studio and Android SDK</a></li>
<li class="has-line-data" data-line-start="7" data-line-end="8"><a href="https://www.oracle.com/ca-en/java/technologies/downloads/">JDK latest version</a></li>
<li class="has-line-data" data-line-start="8" data-line-end="9"><a href="https://nodejs.org">Node JS latest version</a></li>
<li class="has-line-data" data-line-start="9" data-line-end="10">[Npm]</li>
<li class="has-line-data" data-line-start="10" data-line-end="11"><a href="https://www.python.org/downloads/">Python version</a></li>
<li class="has-line-data" data-line-start="11" data-line-end="13"><a href="https://reactnative.dev/">React native</a></li>
</ul>
<h2 class="code-line" data-line-start=13 data-line-end=14 ><a id="Installation_13"></a>Installation</h2>
<p class="has-line-data" data-line-start="14" data-line-end="16">Pour tavailler sur le projet nous recommandons d’utiliser visual studio code.<br>
Pour sont instalation veuillez utiliser la <a href="https://code.visualstudio.com/">Documentation officiel</a></p>
<h3 class="code-line" data-line-start=17 data-line-end=18 ><a id="1__Importer_le_projet_17"></a>1 - Importer le projet</h3>
<p class="has-line-data" data-line-start="18" data-line-end="19">Tout d’abord, cloner le projet avec la commande :</p>
<pre><code class="has-line-data" data-line-start="20" data-line-end="22" class="language-sh">git <span class="hljs-built_in">clone</span> https://gitlab.com/polytechnique-montreal-inf89xy-equipe-<span class="hljs-number">6</span>/neurostimulation-ai-optimization-platform.git
</code></pre>
<h3 class="code-line" data-line-start=22 data-line-end=23 ><a id="2__Lancer_le_serveur_22"></a>2 - Lancer le serveur</h3>
<p class="has-line-data" data-line-start="23" data-line-end="26">Pour intaller <strong>Python</strong> cliquer sur le <a href="https://www.python.org/">lien</a><br>
Tout d’abord, nous recommandons fortement de creer un <strong>environement virtuel</strong>.<br>
Lancer un terminal a partir de la racine du projet. Executer les commandes suivantes :</p>
<pre><code class="has-line-data" data-line-start="27" data-line-end="32" class="language-sh"><span class="hljs-built_in">cd</span> server/server
python3 -m venv venv 
.\venv\Scripts\activate
pip install -r requirements.txt
</code></pre>
<p class="has-line-data" data-line-start="32" data-line-end="33">Pour lancer le serveur utiliser la commande :</p>
<pre><code class="has-line-data" data-line-start="34" data-line-end="36" class="language-sh">python3 server.py
</code></pre>
<p class="has-line-data" data-line-start="36" data-line-end="38">Vous devriez obtenir le resultat suivant :<br>
<img src="https://i.postimg.cc/HkMHk3Yc/flask-Running.png" alt="Alt text" title="a title"></p>
<h3 class="code-line" data-line-start=39 data-line-end=40 ><a id="4__Lancer_lapplication_tablette_39"></a>4 - Lancer l’application tablette</h3>
<p class="has-line-data" data-line-start="40" data-line-end="42"><strong>React Native</strong> est un framework d’applications mobiles open source créé par Facebook. Il est utilisé pour développer des applications pour Android, iOS et UWP en permettant aux développeurs d’utiliser React avec les fonctionnalités natives de ces plateformes.<br>
Pour l’installer refferez-vous a la <a href="https://reactnative.dev/">Documentation officiel</a> :</p>
<p class="has-line-data" data-line-start="43" data-line-end="44">Une fois le framework installer lancer un nouveau terminal et les commandes (a partir de la racine):</p>
<pre><code class="has-line-data" data-line-start="45" data-line-end="48" class="language-sh"><span class="hljs-built_in">cd</span> .\Tablet\NeuralDrive\
npm install --global yarn
</code></pre>
<p class="has-line-data" data-line-start="48" data-line-end="49">YARN est un <strong>gestionnaire de packages npm</strong> (chaque fois que vous installerez un nouveau package il faudra re-executer cette commande).</p>
<pre><code class="has-line-data" data-line-start="50" data-line-end="53" class="language-sh">yarn
npm start
</code></pre>
<p class="has-line-data" data-line-start="53" data-line-end="54"><img src="https://i.postimg.cc/3xGdj033/metro-serveur.png" alt="Alt text" title="a title"></p>
<p class="has-line-data" data-line-start="55" data-line-end="56">Pour finir relancer un autre terminal :</p>
<pre><code class="has-line-data" data-line-start="57" data-line-end="60" class="language-sh"><span class="hljs-built_in">cd</span> .\Tablet\NeuralDrive\
npx react-native run-android
</code></pre>
<p class="has-line-data" data-line-start="60" data-line-end="64"><strong><em>Cette etape devrait prendre beaucoup de temps la premiere fois mais sera beaucoup plus rapide par la suite !</em></strong><br>
<img src="https://i.postimg.cc/436mKWcz/emulateur.png" alt="Alt text" title="a title"><br>
Si vous utiliser une tablette physique alors l’application devrait se lancer directement dessus une fois le techargement complete.<br>
Si vous voulez utiliser un <strong>emulateur</strong> réferer vous a la section suivante --&gt; <strong>Installer un émulateur tablette</strong></p>
<h3 class="code-line" data-line-start=64 data-line-end=65 ><a id="5__Installer_un_mulateur_tablette_Android_64"></a>5 - Installer un émulateur tablette Android</h3>
<ul>
<li class="has-line-data" data-line-start="65" data-line-end="66">To setup the tablet emulator click <strong>Create Virtual Device</strong>.</li>
<li class="has-line-data" data-line-start="66" data-line-end="67">In the <strong>Category pane</strong>, select Tablet and choose a <strong>hardware profile</strong>. Click <strong>Next</strong>.</li>
<li class="has-line-data" data-line-start="67" data-line-end="68">Select a <strong>system image</strong> to download. Select the image with <strong>API Level 31</strong>, and the Target <strong>“Android 12.0”</strong>. Click <strong>Next</strong> and then click <strong>Finish</strong>.</li>
<li class="has-line-data" data-line-start="68" data-line-end="69"><strong>Close</strong> the Android Virtual Device Manager.</li>
<li class="has-line-data" data-line-start="69" data-line-end="71">In the <strong>Android Studio toolbar</strong>, select the AVD you just created from the target device drop-down menu, then <strong>click Run</strong>.</li>
</ul>
<h3 class="code-line" data-line-start=71 data-line-end=72 ><a id="6__Installer_un_mulateur_montre_Wear_OS_71"></a>6 - Installer un émulateur montre Wear OS</h3>
<ul>
<li class="has-line-data" data-line-start="72" data-line-end="73">In Android Studio, open the <strong>Android Virtual Device Manager</strong> by selecting <strong>Tools &gt; AVD Manager</strong>.</li>
<li class="has-line-data" data-line-start="73" data-line-end="74">To setup the smartwatch emulator click <strong>Create Virtual Device</strong>.</li>
<li class="has-line-data" data-line-start="74" data-line-end="75">In the Category pane, <strong>select Wear OS</strong> and <strong>choose a hardware profile</strong>. <strong>Click Next</strong>.</li>
<li class="has-line-data" data-line-start="75" data-line-end="77">Select a <strong>system image</strong> to download. Select the <strong>image with API Level 30</strong>, and the Target <strong>“Android 11.0 (Wear OS)”</strong>. Click <strong>Next</strong> and then click <strong>Finish</strong>.</li>
</ul>
<h3 class="code-line" data-line-start=77 data-line-end=78 ><a id="7_Smart_watch_application_77"></a>7 -Smart watch application</h3>
<p class="has-line-data" data-line-start="78" data-line-end="80">Deploying an app to a watch:<br>
Enable adb debugging on the watch:</p>
<ol>
<li class="has-line-data" data-line-start="80" data-line-end="81">Open the Settings menu on the watch.</li>
<li class="has-line-data" data-line-start="81" data-line-end="82">Scroll to the bottom of the menu. If no Developer options item is provided, tap System and then About.</li>
<li class="has-line-data" data-line-start="82" data-line-end="83">Tap the build number 7 times. A dialog will appear confirming that you are now a developer.</li>
<li class="has-line-data" data-line-start="83" data-line-end="84">From the Settings menu, tap Developer options.</li>
<li class="has-line-data" data-line-start="84" data-line-end="86">Enable ADB debugging.<br>
Connect the watch:</li>
</ol>
<h5 class="code-line" data-line-start=86 data-line-end=87 ><a id="Debug_Over_WiFi_86"></a>Debug Over Wi-Fi:</h5>
<ol>
<li class="has-line-data" data-line-start="87" data-line-end="88">Open the watch’s Settings.</li>
<li class="has-line-data" data-line-start="88" data-line-end="89">Tap Connectivity &gt; Wi-Fi.</li>
<li class="has-line-data" data-line-start="89" data-line-end="91">Choose a network and enter its password if necessary.<br>
Enable Wi-Fi debugging</li>
<li class="has-line-data" data-line-start="91" data-line-end="92">Open the watch’s Settings.</li>
<li class="has-line-data" data-line-start="92" data-line-end="93">Tap Developer options &gt; Debug over Wi-Fi.</li>
<li class="has-line-data" data-line-start="93" data-line-end="95">After a moment the screen will display the watch’s IP address (for example 192.168.1.100).<br>
On Android Studio</li>
<li class="has-line-data" data-line-start="95" data-line-end="96">Open the Device Manager</li>
<li class="has-line-data" data-line-start="96" data-line-end="97">Click on Physical</li>
<li class="has-line-data" data-line-start="97" data-line-end="98">Click on Pair using Wi-Fi</li>
<li class="has-line-data" data-line-start="98" data-line-end="99">Click on Pair using pairing code</li>
<li class="has-line-data" data-line-start="99" data-line-end="101">Pair the watch to Android studio<br>
(If needed) Connect the debugger to the watch (in a terminal)</li>
<li class="has-line-data" data-line-start="101" data-line-end="102">Connect your watch and development machine to the same network.</li>
<li class="has-line-data" data-line-start="102" data-line-end="103">Navigate to your Android/sdk/platform-tools</li>
<li class="has-line-data" data-line-start="103" data-line-end="107">Connect the debugger to the watch using the watch’s IP address. For example, if the IP address is 192.168.1.100, the adb connect command and its response will look like this (a port number, 5555 is added to the address):<br>
 - adb connect 192.168.1.100:5555<br>
 - connected to 192.168.1.100:5555</li>
</ol>
<h3 class="code-line" data-line-start=107 data-line-end=108 ><a id="8__Installer_le_serveur_sur_la_tablette_107"></a>8 - Installer le serveur sur la tablette</h3>
<p class="has-line-data" data-line-start="108" data-line-end="110">Pour cette section il faudra ouvrir le projet avec <strong>Android Studio</strong> (application tablette /tablet/NeuralDraive/android) et <strong>Visual Studio Code</strong>. Cette etape est relativement difficile et depend de la configuration de chacun.<br>
Dans un terminal VScode :</p>
<pre><code class="has-line-data" data-line-start="111" data-line-end="114" class="language-sh">git checkout serverTablet
npx react-native run-android
</code></pre>
<p class="has-line-data" data-line-start="114" data-line-end="115"><strong>En cas d’erreur de compilation !</strong> :</p>
<ul>
<li class="has-line-data" data-line-start="115" data-line-end="117">Dans android studio, essayer de vider le projet : file/invalidate cache<br>
<img src="https://i.postimg.cc/4xgbw6Hw/invalidate.png" alt="Alt text" title="a title"></li>
<li class="has-line-data" data-line-start="117" data-line-end="119">Voir la documentation de <a href="https://chaquo.com/chaquopy/">chaquopy</a> si l’erreur persiste</li>
</ul>
<h4 class="code-line" data-line-start=119 data-line-end=120 ><a id="Metre_a_jour_le_serveur_tablette_119"></a>Metre a jour le serveur tablette</h4>
<p class="has-line-data" data-line-start="120" data-line-end="122">Le seveur tablette ce retrouve ici :<br>
<img src="https://i.postimg.cc/85WS1myx/serveur-Local.png" alt="Alt text" title="a title"></p>
<h2 class="code-line" data-line-start=123 data-line-end=124 ><a id="9__Crer_un_fichier_xcutable_du_serveur_123"></a>9 - Créer un fichier éxécutable du serveur</h2>
<p class="has-line-data" data-line-start="124" data-line-end="125">Dans votre environement virtuel.</p>
<pre><code class="has-line-data" data-line-start="126" data-line-end="128" class="language-sh">pip install pyinstaller
</code></pre>
<p class="has-line-data" data-line-start="128" data-line-end="129">Ensuite lancer la commande :</p>
<pre><code class="has-line-data" data-line-start="130" data-line-end="132" class="language-sh">pyinstaller .\NeuralDriveServer.py 
</code></pre>
<p class="has-line-data" data-line-start="132" data-line-end="134">Ouvrez le dossier <strong>/dist/NeuralDriveServer/</strong> puis lancer l’executable <strong>NeuralDriveServer.exe</strong><br>
<img src="https://i.postimg.cc/d1YyztN8/serveur-UI.png" alt="Alt text" title="a title"></p>
<p class="has-line-data" data-line-start="135" data-line-end="137"><strong><em>Si vous obtenez une erreur</em></strong> :<br>
Vous pouvez essayer de :</p>
<ul>
<li class="has-line-data" data-line-start="137" data-line-end="138">Copier la librairy <strong>/venv/lib/GPY</strong> de votre environement virtuel dans le dossier  <strong>/dist/NeuralDriveServer/</strong>. Cela va écraser le fichier déja present et ca devrais fonctionner.</li>
<li class="has-line-data" data-line-start="138" data-line-end="140">Desactiver votre anti-virus pour 10 min</li>
</ul>
<h2 class="code-line" data-line-start=140 data-line-end=141 ><a id="Folder_Structure_140"></a>Folder Structure</h2>
<p class="has-line-data" data-line-start="141" data-line-end="142">The project follows the following structure</p>
<ul>
<li class="has-line-data" data-line-start="142" data-line-end="146"><strong>server</strong> :<br>
 - server:<br>
  - algorithm: This folder contains the algorithm that was provided by Neuraldrive that does the backend calculations for our application<br>
  - interface:</li>
<li class="has-line-data" data-line-start="146" data-line-end="158"><strong>Tablet/NeuralDrive</strong> :<br>
 - android:<br>
 - ios:<br>
 - node_modules:<br>
 - src: This folder contains the codes that runs all of tablet application<br>
  - assets: This folder contains the assets such as images, icons and etc. used by our tablet application<br>
  - class:<br>
  - components: This folder contains the components that are used throughout the application<br>
  -const:<br>
  - services: This folder contains the services of our application that permits us to connect to the backend and setup the patients information<br>
  - styles: This folder contains the information that permits us to setup the colours and aesthetics of the application<br>
  - views: This folder contains the various pages of our application such as the setting page, main page and etc.</li>
<li class="has-line-data" data-line-start="158" data-line-end="166"><strong>watch_app</strong> :<br>
 - watch:<br>
  - app/src:<br>
   - androidTest: This folder contains the MainActivityTest.kt that implements the tests for the differents features of the app.
   - neuraldrive: This folder contains the MainActivity.kt file that implements the ambient mode support and the sensor event listener support, and the InputFilter.kt file that controls the input field for the IP address so that we don't have any errors<br>
    - res: This folders contains all the layout components of the watch application<br>
    - AndroidManifest.xml: This file contains all the permissions to allow the app to use all its features</li>
</ul>
<h2 class="code-line" data-line-start=166 data-line-end=167 ><a id="Possibles_issues_166"></a>Possibles issues</h2>
<ul>
<li class="has-line-data" data-line-start="167" data-line-end="170">If you encounter this error :<br>
<strong>React-Native: Error: spawnSync adb ENOENT at Object.spawnSync</strong><br>
while running the command <strong>npx react-native run-android</strong>, the solution is to first run the following command in the same folder:</li>
</ul>
<pre><code class="has-line-data" data-line-start="171" data-line-end="173" class="language-sh">adb reverse tcp:<span class="hljs-number">8081</span> tcp:<span class="hljs-number">8081</span>
</code></pre>
