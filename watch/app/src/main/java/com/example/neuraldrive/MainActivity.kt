
package com.example.neuraldrive

import android.Manifest
import android.annotation.SuppressLint
import android.app.AlarmManager
import android.app.PendingIntent
import android.content.*
import android.content.pm.PackageManager
import android.graphics.Color
import android.hardware.Sensor
import android.hardware.SensorEvent
import android.hardware.SensorEventListener
import android.hardware.SensorManager
import android.os.Bundle
import android.text.InputFilter
import android.util.Log
import android.view.View
import android.widget.Toast
import androidx.annotation.VisibleForTesting
import androidx.core.content.getSystemService
import androidx.core.view.isVisible
import androidx.fragment.app.FragmentActivity
import androidx.lifecycle.lifecycleScope
import androidx.wear.ambient.AmbientModeSupport
import com.example.neuraldrive.databinding.ActivityMainBinding
import java.text.SimpleDateFormat
import java.time.Clock
import java.time.Duration
import java.time.Instant
import java.util.*
import kotlinx.coroutines.*
import okhttp3.*
import okhttp3.MediaType.Companion.toMediaType
import okhttp3.RequestBody.Companion.toRequestBody
import okio.IOException


class MainActivity : FragmentActivity(), AmbientModeSupport.AmbientCallbackProvider,
    SensorEventListener {
    private lateinit var binding: ActivityMainBinding

    private lateinit var ambientController: AmbientModeSupport.AmbientController
    private lateinit var ambientUpdateAlarmManager: AlarmManager
    private lateinit var ambientUpdatePendingIntent: PendingIntent
    private lateinit var ambientUpdateBroadcastReceiver: BroadcastReceiver

    @Volatile
    private var drawCount = 0

    private var activeUpdateJob: Job = Job().apply { complete() }

    private val sensorAccelFeature: String = PackageManager.FEATURE_SENSOR_ACCELEROMETER
    private val sensorGyroFeature: String = PackageManager.FEATURE_SENSOR_GYROSCOPE

    private val doesSensorsExist: Boolean
        get() = packageManager.hasSystemFeature(sensorAccelFeature) and packageManager.hasSystemFeature(sensorGyroFeature)

    private lateinit var sensorManager: SensorManager
    private var accelSensor: Sensor? = null
<<<<<<< HEAD
    private var gyroSensor: Sensor? = null

    private var gyroX: Float = 0.0f; private var gyroY: Float = 0.0f ; private var gyroZ: Float = 0.0f
=======
    private var gravSensor: Sensor? = null
    private var gyroSensor: Sensor? = null

    private var gyroX: Float = 0.0f; private var gyroY: Float = 0.0f ; private var gyroZ: Float = 0.0f
    private var gravityX: Float = 0.0f; private var gravityY: Float = 0.0f ; private var gravityZ: Float = 0.0f
>>>>>>> ab6d0bf5bbc98c12026d2fa3285404e2896b6277
    private var accelX: Float = 0.0f; private var accelY: Float = 0.0f; private var accelZ: Float = 0.0f

    private val client = OkHttpClient()
    private var stack = "["
    private var ipAddressServer: String = "0.0.0.0"

    public override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityMainBinding.inflate(layoutInflater)
        setContentView(binding.root)

        if (checkSelfPermission(Manifest.permission.BODY_SENSORS) != PackageManager.PERMISSION_GRANTED) {
            requestPermissions(arrayOf(Manifest.permission.BODY_SENSORS), 1)
        } else {
            Log.d(ContentValues.TAG, "ALREADY GRANTED")
        }

        loadData()

        ambientController = AmbientModeSupport.attach(this)
        ambientUpdateAlarmManager = getSystemService()!!

        val ambientUpdateIntent = Intent(AMBIENT_UPDATE_ACTION)

        ambientUpdatePendingIntent = PendingIntent.getBroadcast(
            this,
            0,
            ambientUpdateIntent,
            PendingIntent.FLAG_IMMUTABLE or PendingIntent.FLAG_UPDATE_CURRENT
        )

        ambientUpdateBroadcastReceiver = object : BroadcastReceiver() {
            override fun onReceive(context: Context, intent: Intent) {
                refreshDisplayAndSetNextUpdate()
            }
        }
        sensorManager = getSystemService(Context.SENSOR_SERVICE) as SensorManager
    }

    //To save the most recent IP address used
    private fun saveData(){
        binding.currentIP.text = ipAddressServer
        val sharedPreferences: SharedPreferences = getSharedPreferences("sharedPref", Context.MODE_PRIVATE)
        val editor: SharedPreferences.Editor = sharedPreferences.edit()
        editor.apply{
            putString("String_IP", ipAddressServer)
        }.apply()
        Toast.makeText(this, "IP Address Saved", Toast.LENGTH_SHORT).show()
    }

    //To set the IP address to the last saved ip address
    private fun loadData(){
        val sharedPreferences: SharedPreferences = getSharedPreferences("sharedPref", Context.MODE_PRIVATE)
        val savedIP: String? = sharedPreferences.getString("String_IP", null)
        binding.currentIP.text = savedIP
        ipAddressServer = savedIP.toString()
    }

    //To hide the IP address settings
    private fun showHideSettings(view: View){
        view.visibility = if (view.visibility == View.VISIBLE){
            View.INVISIBLE
        } else{
            View.VISIBLE
        }
        if(view.isVisible){
            binding.showIP.setText(R.string.hide)
        }else{
            binding.showIP.setText(R.string.show)
        }
    }

    //When the watch is in onResume state
    public override fun onResume() {
        super.onResume()
        if((sensorManager.getDefaultSensor(Sensor.TYPE_ACCELEROMETER)  != null)and(sensorManager.getDefaultSensor(Sensor.TYPE_GYROSCOPE)  != null)) {
            accelSensor = sensorManager.getDefaultSensor(Sensor.TYPE_ACCELEROMETER)
            sensorManager.registerListener(this,accelSensor, SensorManager.SENSOR_DELAY_GAME)
<<<<<<< HEAD
=======
            gravSensor = sensorManager.getDefaultSensor(Sensor.TYPE_GRAVITY)
            sensorManager.registerListener(this,gravSensor, SensorManager.SENSOR_DELAY_GAME)
>>>>>>> ab6d0bf5bbc98c12026d2fa3285404e2896b6277
            gyroSensor = sensorManager.getDefaultSensor(Sensor.TYPE_GYROSCOPE)
            sensorManager.registerListener(this,gyroSensor, SensorManager.SENSOR_DELAY_GAME)
        }else{
            //Fail to get
            Log.d("Fail:", doesSensorsExist.toString())
        }
        //Sending data every 500 ms
        Timer().scheduleAtFixedRate( object : TimerTask() {
            override fun run() {
<<<<<<< HEAD
                if(ipAddressServer!="") {
=======
                if(ipAddressServer!="" && stack[stack.length-1]!=']') {
>>>>>>> ab6d0bf5bbc98c12026d2fa3285404e2896b6277
                    println(stack)
                    sendData()
                }
            }
        }, 0, 500)
        val filter = IntentFilter(AMBIENT_UPDATE_ACTION)
        registerReceiver(ambientUpdateBroadcastReceiver, filter)
        refreshDisplayAndSetNextUpdate()
    }

    //When the watch is in onPause state
    public override fun onPause() {
        super.onPause()
        sensorManager.unregisterListener(this)
        unregisterReceiver(ambientUpdateBroadcastReceiver)
        activeUpdateJob.cancel()
        ambientUpdateAlarmManager.cancel(ambientUpdatePendingIntent)
    }

    //To refresh the display on ambient mode
    private fun refreshDisplayAndSetNextUpdate() {
        loadDataAndUpdateScreen()
        val instant = Instant.now(clock)
        if (ambientController.isAmbient) {
            val triggerTime = instant.getNextInstantWithInterval(AMBIENT_INTERVAL)
            ambientUpdateAlarmManager.setExact(
                AlarmManager.RTC_WAKEUP,
                triggerTime.toEpochMilli(),
                ambientUpdatePendingIntent
            )
        } else {
            val delay = instant.getDelayToNextInstantWithInterval(ACTIVE_INTERVAL)
            activeUpdateJob.cancel()
            activeUpdateJob = lifecycleScope.launch {
                withContext(activeDispatcher) {
                    // Delay on the active dispatcher for testability
                    delay(delay.toMillis())
                }
                refreshDisplayAndSetNextUpdate()
            }
        }
    }

    private fun Instant.getDelayToNextInstantWithInterval(interval: Duration): Duration =
        Duration.ofMillis(interval.toMillis() - toEpochMilli() % interval.toMillis())

    private fun Instant.getNextInstantWithInterval(interval: Duration): Instant =
        plus(getDelayToNextInstantWithInterval(interval))

    // To update the screen when something happens
    private fun loadDataAndUpdateScreen() {
        drawCount += 1

        binding.appName.text = getString(R.string.app_name)

        val ipPart1 = binding.ip1.text
        ipPart1.filters = arrayOf<InputFilter>(InputFilterMinMax("0", "255"))
        val ipPart2 = binding.ip2.text
        ipPart2.filters = arrayOf<InputFilter>(InputFilterMinMax("0", "255"))
        val ipPart3 = binding.ip3.text
        ipPart3.filters = arrayOf<InputFilter>(InputFilterMinMax("0", "255"))
        val ipPart4 = binding.ip4.text
        ipPart4.filters = arrayOf<InputFilter>(InputFilterMinMax("0", "255"))

        binding.setIP.setOnClickListener{
<<<<<<< HEAD
            ipAddressServer = "$ipPart1.$ipPart2.$ipPart3.$ipPart4"
            println(ipAddressServer)
            saveData()
=======
            println("$ipPart1.$ipPart2.$ipPart3.$ipPart4".isEmpty())
            println("this: $ipPart1")
            if (ipPart1.isNotEmpty() &&
                ipPart2.isNotEmpty() &&
                ipPart3.isNotEmpty() &&
                ipPart4.isNotEmpty()
            ) {
                ipAddressServer = "$ipPart1.$ipPart2.$ipPart3.$ipPart4"
                saveData()
            }
>>>>>>> ab6d0bf5bbc98c12026d2fa3285404e2896b6277
        }

        binding.showIP.setOnClickListener{
            showHideSettings(binding.ip1)
            showHideSettings(binding.ip2)
            showHideSettings(binding.ip3)
            showHideSettings(binding.ip4)
            showHideSettings(binding.dot1)
            showHideSettings(binding.dot2)
            showHideSettings(binding.dot3)
            showHideSettings(binding.setIP)
            showHideSettings(binding.current)
            showHideSettings(binding.currentIP)
        }
    }

    //This section is used to control the ambient mode feature
    override fun getAmbientCallback(): AmbientModeSupport.AmbientCallback = MyAmbientCallback()

    private inner class MyAmbientCallback : AmbientModeSupport.AmbientCallback() {
        private var isLowBitAmbient = false
        private var doBurnInProtection = false

        override fun onEnterAmbient(ambientDetails: Bundle) {
            super.onEnterAmbient(ambientDetails)
            isLowBitAmbient =
                ambientDetails.getBoolean(AmbientModeSupport.EXTRA_LOWBIT_AMBIENT, false)
            doBurnInProtection =
                ambientDetails.getBoolean(AmbientModeSupport.EXTRA_BURN_IN_PROTECTION, false)

            // Cancel any active updates
            activeUpdateJob.cancel()

            binding.appName.setTextColor(Color.WHITE)
            binding.setIP.setTextColor(Color.WHITE)
            binding.showIP.setTextColor(Color.WHITE)
            binding.current.setTextColor(Color.WHITE)
            if (isLowBitAmbient) {
                binding.appName.paint.isAntiAlias = false
                binding.setIP.paint.isAntiAlias = false
                binding.showIP.paint.isAntiAlias = false
            }
            refreshDisplayAndSetNextUpdate()
        }

        override fun onUpdateAmbient() {
            super.onUpdateAmbient()
        }

        override fun onExitAmbient() {
            super.onExitAmbient()
            /* Clears out Alarms since they are only used in ambient mode. */
            ambientUpdateAlarmManager.cancel(ambientUpdatePendingIntent)
            binding.appName.setTextColor(Color.CYAN)
            binding.setIP.setTextColor(Color.CYAN)
            binding.showIP.setTextColor(Color.CYAN)
            binding.current.setTextColor(Color.CYAN)
            if (isLowBitAmbient) {
                binding.appName.paint.isAntiAlias = true
                binding.setIP.paint.isAntiAlias = true
                binding.showIP.paint.isAntiAlias = true
            }

            refreshDisplayAndSetNextUpdate()
        }
    }

    //To capture the sensor changes as well as the current time and add them to the stack
    @SuppressLint("SimpleDateFormat")
    override fun onSensorChanged(event: SensorEvent?) {
        if (event!!.sensor.type == Sensor.TYPE_ACCELEROMETER){
            accelX = event.values[0]
            accelY = event.values[1]
            accelZ = event.values[2]
        }

<<<<<<< HEAD
=======
        if (event.sensor.type == Sensor.TYPE_GRAVITY){
            gravityX = event.values[0]
            gravityY = event.values[1]
            gravityZ = event.values[2]
        }

>>>>>>> ab6d0bf5bbc98c12026d2fa3285404e2896b6277
        if (event.sensor.type == Sensor.TYPE_GYROSCOPE){
            gyroX = event.values[0]
            gyroY = event.values[1]
            gyroZ = event.values[2]
        }
        val sdf = SimpleDateFormat("dd/M/yyyy hh:mm:ss")
        val currentTime = sdf.format(Date())

<<<<<<< HEAD
        addDataToStack(currentTime ,accelX, accelY, accelZ, gyroX, gyroY, gyroZ)
=======
        addDataToStack(currentTime ,accelX, accelY, accelZ, gravityX, gravityY, gravityZ, gyroX, gyroY, gyroZ)
>>>>>>> ab6d0bf5bbc98c12026d2fa3285404e2896b6277
    }

    //Sensor feature
    override fun onAccuracyChanged(event: Sensor?, p1: Int) = Unit

    companion object {
        val MEDIA_TYPE_MARKDOWN = "text/x-markdown; charset=utf-8".toMediaType()

<<<<<<< HEAD
        private const val TAG = "MainActivity"

        private val ACTIVE_INTERVAL = Duration.ofSeconds(1)

        private val AMBIENT_INTERVAL = Duration.ofSeconds(10)

=======
        private val ACTIVE_INTERVAL = Duration.ofSeconds(1)
        private val AMBIENT_INTERVAL = Duration.ofSeconds(10)
>>>>>>> ab6d0bf5bbc98c12026d2fa3285404e2896b6277
        const val AMBIENT_UPDATE_ACTION =
            "com.example.neuraldrive.action.AMBIENT_UPDATE"
    }

    //Creating the data stack
<<<<<<< HEAD
    private fun addDataToStack(currentTime : String, acc_x : Float, acc_y : Float, acc_z : Float, gir_x : Float, gir_y : Float, gir_z : Float){
=======
    private fun addDataToStack(currentTime : String, acc_x : Float, acc_y : Float, acc_z : Float, grav_x : Float, grav_y : Float, grav_z : Float, gir_x : Float, gir_y : Float, gir_z : Float){
>>>>>>> ab6d0bf5bbc98c12026d2fa3285404e2896b6277
        val data = "{"+
            "\"time\"" + ":" + "\""+currentTime +"\""+ ","+
            "\"acc_x\"" + ":" + "\""+acc_x.toString() +"\""+ ","+
            "\"acc_y\"" + ":" + "\""+acc_y.toString() +"\""+ ","+
            "\"acc_z\"" + ":" + "\""+acc_z.toString() +"\""+ ","+
<<<<<<< HEAD
=======
            "\"grav_x\"" + ":" + "\""+grav_x.toString() +"\""+ ","+
            "\"grav_y\"" + ":" + "\""+grav_y.toString() +"\""+ ","+
            "\"grav_z\"" + ":" + "\""+grav_z.toString() +"\""+ ","+
>>>>>>> ab6d0bf5bbc98c12026d2fa3285404e2896b6277
            "\"gir_x\"" + ":" + "\""+gir_x.toString() +"\""+ ","+
            "\"gir_y\"" + ":" + "\""+gir_y.toString() +"\""+ ","+
            "\"gir_z\"" + ":" + "\""+gir_z.toString() +"\""+
            "},"
        this.stack += data
    }

    //sendData sends http request to the IP address that is entered
    private fun sendData(){
        this.stack = this.stack.dropLast(1)
        this.stack += "]"
        val postBody = this.stack.trimMargin()

        val request = Request.Builder()
            .url("http://$ipAddressServer:5000/watch_packet/")
            .post(postBody.toRequestBody(MEDIA_TYPE_MARKDOWN))
            .build()
        client.newCall(request).enqueue(object : Callback {
            override fun onFailure(call: Call, e: IOException) {
                e.printStackTrace()
            }

            override fun onResponse(call: Call, response: Response) {
                response.use {
                    if (!response.isSuccessful) throw IOException("Unexpected code $response")

                    for ((name, value) in response.headers) {
                        println("$name: $value")
                    }

                    println(response.body!!.string())
                }
            }
        })
        this.stack = "["
    }
}

/**
 * The [Clock] driving the time information. Overridable only for testing.
 */
@VisibleForTesting(otherwise = VisibleForTesting.PRIVATE)
internal var clock: Clock = Clock.systemDefaultZone()

/**
 * The dispatcher used for delaying in active mode. Overridable only for testing.
 */
@VisibleForTesting(otherwise = VisibleForTesting.PRIVATE)
internal var activeDispatcher: CoroutineDispatcher = Dispatchers.Main.immediate
