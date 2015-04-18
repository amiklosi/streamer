package hu.tilos.radio.backend;

import org.junit.Assert;
import org.junit.Test;

import static org.junit.Assert.*;

public class TilosConfigSourceTest {

    @Test
    public void test(){
        //given
        TilosConfigSource cs = new TilosConfigSource();

        //when
        Assert.assertEquals("TILOS_LAJOS_AHOJ",cs.propertyToEnvName("tilos.lajos.ahoj"));


    }
}