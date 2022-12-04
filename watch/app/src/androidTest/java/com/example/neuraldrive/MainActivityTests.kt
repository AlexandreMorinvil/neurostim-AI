package com.example.neuraldrive

import android.app.Application
import android.app.PendingIntent
import android.content.Intent
import android.view.KeyEvent
import androidx.lifecycle.Lifecycle
import androidx.test.core.app.ActivityScenario
import androidx.test.core.app.ApplicationProvider
import androidx.test.core.app.launchActivity
import androidx.test.espresso.Espresso
import androidx.test.espresso.Espresso.onView
import androidx.test.espresso.assertion.ViewAssertions.matches
import androidx.test.espresso.matcher.ViewMatchers.withId
import androidx.test.espresso.matcher.ViewMatchers.withText
import androidx.test.ext.junit.runners.AndroidJUnit4
import androidx.test.platform.app.InstrumentationRegistry
import androidx.test.uiautomator.UiDevice
import kotlinx.coroutines.ExperimentalCoroutinesApi
import kotlinx.coroutines.test.StandardTestDispatcher
import kotlinx.coroutines.test.TestCoroutineScheduler
import kotlinx.coroutines.test.TestScope
import kotlinx.coroutines.test.runTest
import org.junit.After
import org.junit.Before
import org.junit.Test
import org.junit.runner.RunWith
import java.time.Duration

@RunWith(AndroidJUnit4::class)
@OptIn(ExperimentalCoroutinesApi::class)
class MainActivityTests {
    private val context = ApplicationProvider.getApplicationContext<Application>()

    private val testScope = TestScope()

    private lateinit var scenario: ActivityScenario<MainActivity>

    private lateinit var uiDevice: UiDevice

    @Before
    fun setup() {
        uiDevice = UiDevice.getInstance(InstrumentationRegistry.getInstrumentation())

        // Ensure we are starting in active mode
        pressKeyCodeWithWait(KeyEvent.KEYCODE_WAKEUP)

        // Override the active dispatcher with a test one that we can control the time for
        activeDispatcher = StandardTestDispatcher(testScope.testScheduler)

        scenario = launchActivity()
    }

    @After
    fun teardown() {
        scenario.close()
    }

    @Test
    fun initialTextIsCorrect(): Unit = testScope.runTest {
        scenario.moveToState(Lifecycle.State.RESUMED)

        onView(withId(R.id.app_name)).check(matches(withText(R.string.app_name)))

        // Pause the activity to cancel queued work
        scenario.moveToState(Lifecycle.State.STARTED)
    }

    @Test
    fun textIsCorrectAfterFiveSeconds(): Unit = testScope.runTest {
        scenario.moveToState(Lifecycle.State.RESUMED)

        // Advance 5 seconds, one at a time
        repeat(5) {
            advanceTime(Duration.ofSeconds(1))
        }

        onView(withId(R.id.app_name)).check(matches(withText(R.string.app_name)))

        // Pause the activity to cancel queued work
        scenario.moveToState(Lifecycle.State.STARTED)
    }

    @Test
    fun textIsCorrectAfterGoingIntoAmbientMode(): Unit = testScope.runTest {
        scenario.moveToState(Lifecycle.State.RESUMED)

        // Advance 5 seconds, one at a time
        repeat(5) {
            advanceTime(Duration.ofSeconds(1))
        }

        pressKeyCodeWithWait(KeyEvent.KEYCODE_SLEEP)
        Espresso.onIdle()

        onView(withId(R.id.app_name)).check(matches(withText(R.string.app_name)))

        // Pause the activity to cancel queued work
        scenario.moveToState(Lifecycle.State.STARTED)
    }

    @Test
    fun textIsCorrectAfterGoingIntoAmbientModeAndReceivingIntent(): Unit = testScope.runTest {
        scenario.moveToState(Lifecycle.State.RESUMED)

        // Advance 5 seconds, one at a time
        repeat(5) {
            advanceTime(Duration.ofSeconds(1))
        }

        advanceTime(Duration.ofMillis(500))

        pressKeyCodeWithWait(KeyEvent.KEYCODE_SLEEP)
        Espresso.onIdle()

        // Simulate a sent broadcast
        advanceTime(Duration.ofSeconds(5))
        scenario.onActivity {
            PendingIntent.getBroadcast(
                it,
                0,
                Intent(MainActivity.AMBIENT_UPDATE_ACTION),
                PendingIntent.FLAG_UPDATE_CURRENT
            ).send()
        }

        Thread.sleep(1000) // Ugly sleep, without it sometimes the broadcast won't be received
        Espresso.onIdle()

        onView(withId(R.id.app_name)).check(matches(withText(R.string.app_name)))

        // Pause the activity to cancel queued work
        scenario.moveToState(Lifecycle.State.STARTED)
    }

    @Test
    fun textIsCorrectAfterReturningToActiveMode(): Unit = testScope.runTest {
        scenario.moveToState(Lifecycle.State.RESUMED)

        // Advance 5 seconds, one at a time
        repeat(5) {
            advanceTime(Duration.ofSeconds(1))
        }

        advanceTime(Duration.ofMillis(500))

        // Enter ambient mode
        pressKeyCodeWithWait(KeyEvent.KEYCODE_SLEEP)
        Espresso.onIdle()

        // Simulate a sent broadcast
        advanceTime(Duration.ofSeconds(5))
        scenario.onActivity {
            PendingIntent.getBroadcast(
                it,
                0,
                Intent(MainActivity.AMBIENT_UPDATE_ACTION),
                PendingIntent.FLAG_UPDATE_CURRENT
            ).send()
        }

        Espresso.onIdle()

        advanceTime(Duration.ofSeconds(2))

        // Exit ambient mode
        pressKeyCodeWithWait(KeyEvent.KEYCODE_WAKEUP)
        Espresso.onIdle()

        onView(withId(R.id.app_name)).check(matches(withText(R.string.app_name)))

        // Pause the activity to cancel queued work
        scenario.moveToState(Lifecycle.State.STARTED)
    }

    /**
     * Advances the simulated time by the given [duration], updating the [TestCoroutineScheduler],
     * the [clock] and running any updates due to those changes.
     */
    private fun advanceTime(duration: Duration) {
//        instant += duration
//        updateClock()
        testScope.testScheduler.advanceTimeBy(duration.toMillis())
        testScope.testScheduler.runCurrent()
        Espresso.onIdle()
    }

    /**
     * Presses the given key with an ugly sleep, without it sometimes ambient mode won't be entered
     * or exited.
     */
    private fun pressKeyCodeWithWait(keyCode: Int) {
        uiDevice.pressKeyCode(keyCode)
        Thread.sleep(1000)
    }
}
