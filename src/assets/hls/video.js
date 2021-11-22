

if (Hls.isSupported()) {
    const video = document.getElementById('video');
    // const config = {
    //     autoStartLoad: true,
    //     startPosition: -1,
    //     initialLiveManifestSize: 5,
    //     maxBufferLength: 30,
    //     backBufferLength: 0,
    //     // inicio desde 0 segundos
    //     debug: false
    // };

    const config = {
        autoStartLoad: true,
        startPosition: -1,
        debug: false,
        capLevelOnFPSDrop: false,
        capLevelToPlayerSize: false,
        //defaultAudioCodec: undefined,
        initialLiveManifestSize: 1,
        maxBufferLength: 30,
        maxMaxBufferLength: 600,
        backBufferLength: 0, //0
        maxBufferSize: 60 * 1000 * 1000,
        maxBufferHole: 0.5,
        highBufferWatchdogPeriod: 2,
        nudgeOffset: 0.1,
        nudgeMaxRetry: 3,
        //maxFragLookUpTolerance: 0.25,
        liveSyncDurationCount: 3,
        liveMaxLatencyDurationCount: 10, //#EXT-X-TARGETDURATION:10
        liveDurationInfinity: false,
        enableWorker: true,
        enableSoftwareAES: true,
        manifestLoadingTimeOut: 10000,
        manifestLoadingMaxRetry: 1,
        manifestLoadingRetryDelay: 1000,
        manifestLoadingMaxRetryTimeout: 64000,
        //startLevel: undefined,
        levelLoadingTimeOut: 10000,
        levelLoadingMaxRetry: 4,
        levelLoadingRetryDelay: 1000,
        levelLoadingMaxRetryTimeout: 64000,
        fragLoadingTimeOut: 20000,
        fragLoadingMaxRetry: 6,
        fragLoadingRetryDelay: 1000,
        fragLoadingMaxRetryTimeout: 64000,
        startFragPrefetch: false,
        testBandwidth: true,
        progressive: false,
        lowLatencyMode: true,
        fpsDroppedMonitoringPeriod: 5000,
        fpsDroppedMonitoringThreshold: 0.2,
        appendErrorMaxRetry: 3,
        //loader: customLoader,
        //fLoader: customFragmentLoader,
        //pLoader: customPlaylistLoader,
        //xhrSetup: XMLHttpRequestSetupCallback,
        //fetchSetup: FetchSetupCallback,
        //abrController: AbrController,
        //bufferController: BufferController,
        //capLevelController: CapLevelController,
        //fpsController: FPSController,
        //timelineController: TimelineController,
        enableWebVTT: true,
        enableIMSC1: true,
        enableCEA708Captions: true,
        stretchShortVideoTrack: false,
        maxAudioFramesDrift: 1,
        forceKeyFrameOnDiscontinuity: true,
        abrEwmaFastLive: 3.0,
        abrEwmaSlowLive: 9.0,
        abrEwmaFastVoD: 3.0,
        abrEwmaSlowVoD: 9.0,
        abrEwmaDefaultEstimate: 500000,
        abrBandWidthFactor: 0.95,
        abrBandWidthUpFactor: 0.7,
        abrMaxWithRealBitrate: false,
        maxStarvationDelay: 4,
        maxLoadingDelay: 4,
        minAutoBitrate: 0,
        emeEnabled: false,
        widevineLicenseUrl: undefined,
        licenseXhrSetup: undefined,
        //drmSystemOptions: {},
        //requestMediaKeySystemAccessFunc: requestMediaKeySystemAccess,
        //cmcd: undefined,
    }

    const url = 'http://localhost:7000';
    //const url = 'http://147.182.132.227:7000';
    const hls = new Hls(config);
    //var hls = new Hls();
    // bind them together
    hls.attachMedia(video);
    hls.on(Hls.Events.MEDIA_ATTACHED, function () {
        console.log('video and hls.js are now bound together !');
        let playlist = '/append.m3u8';
        //hls.loadSource('/video');
        //hls.loadSource('http://localhost:7000/segment.m3u8');
        hls.loadSource(url + playlist);
        hls.on(Hls.Events.MANIFEST_PARSED, function (event, data) {
            console.log(
                'manifest loaded, found ' + data.levels.length + ' quality level'
            );
            video.muted = true;
            video.play();

            // setTimeout(function () {
            //     video.pause();
            // }, 10000);

            //crear metodo que cargue archivo playlist.m3u8
            //crear metodo que lea las lineas archivo playlist.m3u8
            //crear metodo que elimine el primer segmento y agregue uno al final
            //crear metodo que sume EXT-X-MEDIA-SEQUENCE +1 cada vez que se elimine un segmento 

        });
    });
}
