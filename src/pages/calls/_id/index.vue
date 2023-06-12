<template>
    <v-row>
        <v-col>
            <v-card mx-width="300px">
                <v-card-text>
                    <div class="text-center">
                        <audio controls>
                            <source :src="'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3'" type="audio/mp3" />
                            Your browser does not support the audio tag.
                        </audio>
                        <v-tooltip bottom>
                            <template v-slot:activator="{ on, attrs }">
                            <v-btn
                                class="skip-buttons"
                                icon
                                v-bind="attrs"
                                v-on="on"
                            >
                                <v-icon>mdi-rewind</v-icon>
                            </v-btn>
                            </template>
                            <span> Fast backward 10 seconds </span>
                        </v-tooltip>
                        <v-btn
                            class="mx-2 play-pause-button mb-2"
                            fab
                            large
                            color="blue"
                        >
                            <v-icon color="white">
                            mdi-play
                            </v-icon>
                        </v-btn>
                        <v-tooltip bottom>
                            <template v-slot:activator="{ on, attrs }">
                            <v-btn
                                class="skip-buttons"
                                icon
                                v-bind="attrs"
                                v-on="on"
                            >
                                <v-icon>mdi-fast-forward</v-icon>
                            </v-btn>
                            </template>
                            <span> Fast forward 10 seconds </span>
                        </v-tooltip>
                    </div>
                </v-card-text>
            </v-card>
        </v-col>
    </v-row>
    
</template>