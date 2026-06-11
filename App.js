import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

const STAGES = [
  { key: 'seizure', label: 'Seizure' },
  { key: 'nonVerbal', label: 'Non-verbal' },
  { key: 'mobility', label: 'Mobility Issue' },
  { key: 'fainting', label: 'Fainting' },	
];

function formatTime(seconds) {
  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  return [hrs, mins, secs]
    .map((unit) => String(unit).padStart(2, '0'))
    .join(':');
}

export default function App() {
  const [isTracking, setIsTracking] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [duration, setDuration] = useState(0);

  const [activeStages, setActiveStages] = useState({
    seizure: false,
    nonVerbal: false,
    mobility: false,
    fainting: false,
  });

  const [stageLog, setStageLog] = useState([]);
  const [episodes, setEpisodes] = useState([]);
  const [selectedEpisodeId, setSelectedEpisodeId] = useState(null);
  const selectedEpisode = episodes.find(
    (episode) => episode.id === selectedEpisodeId
  );

  useEffect(() => {
    const interval = setInterval(() => {
      if (isTracking && startTime) {
        setDuration(Math.floor((Date.now() - startTime) / 1000));
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [isTracking, startTime]);

  function startEpisode() {
    setIsTracking(true);
    setStartTime(Date.now());
    setDuration(0);
    setStageLog([]);
    setActiveStages({
      seizure: false,
      nonVerbal: false,
      mobility: false,
      fainting: false,
    });
  }

  function endEpisode() {
  const finishedEpisode = {
   id: Date.now().toString(),
   startTime,
   endTime: Date.now(),
   durationSeconds: duration,
   stageLog,
   notes: '',
  };

  setEpisodes((currentEpisodes) => [finishedEpisode, ...currentEpisodes]);

  setIsTracking(false);
  setStartTime(null);
  setDuration(0);
  setStageLog([]);

  setActiveStages({
    seizure: false,
    nonVerbal: false,
    mobility: false,
    fainting: false,
  });
}

function updateEpisodeNotes(episodeId, notes) {
  setEpisodes((currentEpisodes) =>
    currentEpisodes.map((episode) =>
      episode.id === episodeId ? { ...episode, notes } : episode
    )
  );
}

  function toggleStage(stageKey) {
    if (!isTracking) return;

    setActiveStages((current) => ({
      ...current,
      [stageKey]: !current[stageKey],
    }));

    setStageLog((currentLog) => [
      ...currentLog,
      {
        stage: stageKey,
        action: activeStages[stageKey] ? 'ended' : 'started',
        timestamp: Date.now(),
        episodeTimeSeconds: duration,
      },
    ]);
  }

if (selectedEpisode) {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Episode Details</Text>

      <Pressable
        style={styles.backButton}
        onPress={() => setSelectedEpisodeId(null)}
      >
        <Text style={styles.backButtonText}>Back</Text>
      </Pressable>

      <View style={styles.episodeCard}>
        <Text style={styles.episodeTitle}>
          Duration: {formatTime(selectedEpisode.durationSeconds)}
        </Text>

        <Text style={styles.episodeText}>
          Started: {new Date(selectedEpisode.startTime).toLocaleString()}
        </Text>

        <Text style={styles.episodeText}>
          Ended: {new Date(selectedEpisode.endTime).toLocaleString()}
        </Text>
      </View>

      <Text style={styles.sectionTitle}>Notes</Text>

      <TextInput
        style={styles.notesInput}
        placeholder="Write notes about what happened..."
        multiline
        value={selectedEpisode.notes}
        onChangeText={(text) =>
          updateEpisodeNotes(selectedEpisode.id, text)
        }
      />

      <Text style={styles.sectionTitle}>Stage Timeline</Text>

      {selectedEpisode.stageLog.length === 0 ? (
        <Text style={styles.emptyText}>No stages were toggled.</Text>
      ) : (
        selectedEpisode.stageLog.map((item, index) => (
          <View key={index} style={styles.timelineItem}>
            <Text style={styles.episodeTitle}>
              {item.stage} {item.action}
            </Text>
            <Text style={styles.episodeText}>
              At {formatTime(item.episodeTimeSeconds)}
            </Text>
          </View>
        ))
      )}

      <StatusBar style="auto" />
    </ScrollView>
  );
}

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Shalom</Text>
      <Text style={styles.subtitle}>Care Episode Tracker</Text>

      <View style={styles.timerCard}>
        <Text style={styles.label}>
          {isTracking ? 'Episode in progress' : 'Ready to track'}
        </Text>

        <Text style={styles.timer}>{formatTime(duration)}</Text>

        {!isTracking ? (
          <Pressable style={styles.startButton} onPress={startEpisode}>
            <Text style={styles.startButtonText}>Start Episode</Text>
          </Pressable>
        ) : (
          <Pressable style={styles.endButton} onPress={endEpisode}>
            <Text style={styles.endButtonText}>End Episode</Text>
          </Pressable>
        )}
      </View>

      <Text style={styles.sectionTitle}>Current stage</Text>

      <View style={styles.stageGrid}>
        {STAGES.map((stage) => {
          const isActive = activeStages[stage.key];

          return (
            <Pressable
              key={stage.key}
              style={[
                styles.stageButton,
                isActive && styles.stageButtonActive,
                !isTracking && styles.stageButtonDisabled,
              ]}
              onPress={() => toggleStage(stage.key)}
            >
              <Text
                style={[
                  styles.stageButtonText,
                  isActive && styles.stageButtonTextActive,
                ]}
              >
                {stage.label}
              </Text>
            </Pressable>
          );
        })}
      </View>
<Text style={styles.sectionTitle}>Recent Episodes</Text>

{episodes.length === 0 ? (
  <Text style={styles.emptyText}>No episodes saved yet.</Text>
) : (
  episodes.map((episode) => (
    <Pressable
      key={episode.id}
      style={styles.episodeCard}
      onPress={() => setSelectedEpisodeId(episode.id)}
    >
      <Text style={styles.episodeTitle}>
        Episode - {formatTime(episode.durationSeconds)}
      </Text>

      <Text style={styles.episodeText}>
        Stage changes: {episode.stageLog.length}
      </Text>

      <Text style={styles.episodeText}>
        Started: {new Date(episode.startTime).toLocaleTimeString()}
      </Text>

      <Text style={styles.episodeText}>
        Notes: {episode.notes ? 'Added' : 'No notes yet'}
      </Text>

      <Text style={styles.openText}>Tap to view details</Text>
    </Pressable>
  ))
)}

      <StatusBar style="auto" />
    </ScrollView>
  );
}



const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#f8f5ef',
    padding: 24,
    paddingTop: 70,
  },
  title: {
    fontSize: 42,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 28,
  },
  timerCard: {
    backgroundColor: 'white',
    borderRadius: 28,
    padding: 28,
    alignItems: 'center',
    marginBottom: 28,
  },
  label: {
    fontSize: 16,
    marginBottom: 12,
  },
  timer: {
    fontSize: 52,
    fontWeight: 'bold',
    marginBottom: 24,
  },
  startButton: {
    width: '100%',
    backgroundColor: '#111827',
    paddingVertical: 20,
    borderRadius: 18,
    alignItems: 'center',
  },
  startButtonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: '700',
  },
  endButton: {
    width: '100%',
    backgroundColor: '#7f1d1d',
    paddingVertical: 20,
    borderRadius: 18,
    alignItems: 'center',
  },
  endButtonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: '700',
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 14,
  },
  stageGrid: {
    gap: 14,
  },
  stageButton: {
    backgroundColor: 'white',
    paddingVertical: 22,
    paddingHorizontal: 20,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  stageButtonActive: {
    backgroundColor: '#111827',
    borderColor: '#111827',
  },
  stageButtonDisabled: {
    opacity: 0.45,
  },
  stageButtonText: {
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center',
  },
  stageButtonTextActive: {
    color: 'white',
  },
  episodeCard: {
  backgroundColor: 'white',
  borderRadius: 18,
  padding: 18,
  marginBottom: 12,
},
episodeTitle: {
  fontSize: 18,
  fontWeight: '700',
},
episodeText: {
  fontSize: 15,
  marginTop: 4,
},
emptyText: {
  fontSize: 16,
  opacity: 0.6,
},

backButton: {
  backgroundColor: 'white',
  paddingVertical: 14,
  paddingHorizontal: 20,
  borderRadius: 14,
  marginBottom: 20,
},
backButtonText: {
  fontSize: 18,
  fontWeight: '700',
  textAlign: 'center',
},
notesInput: {
  backgroundColor: 'white',
  minHeight: 140,
  borderRadius: 18,
  padding: 18,
  fontSize: 17,
  textAlignVertical: 'top',
  marginBottom: 24,
},
timelineItem: {
  backgroundColor: 'white',
  borderRadius: 16,
  padding: 16,
  marginBottom: 10,
},
openText: {
  fontSize: 15,
  fontWeight: '700',
  marginTop: 10,
},
});
