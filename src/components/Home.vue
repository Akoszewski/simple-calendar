<template>
  <div>
    <div id="bubble" class="speech-bubble" v-bind:style="{ top: bubbleY, left: bubbleX, visibility: bubbleVisibility, transform: bubbleTransform }">
      <span class="BubbleText" v-bind:style="{ transform: BubbleTextTransform }">
        <p><strong>{{bubbleTitle + " (" + bubbleDate + ")"}}</strong></p>
        <p>{{bubbleText}}</p>
      </span>
    </div>
    <full-calendar ref="calendar" :events='events' @day-click='hideDetails()' @event-selected='showDetails($event)' :config='config' />
  </div>
</template>

<script>
export default {
  name: 'Home',
  data: () => ({
    bubblex: 0,
    bubbley: 0,
    bubbleDate: '',
    bubblev: 'hidden',
    bubbleTitle: 'title',
    bubbleText: 'text',
    transformBubble: '',
    transformBubbleText: '',
    config: {
      firstDay: 1,
      defaultView: 'month'
    },
    events: []
  }),
  computed: {
    bubbleX () {
      return this.bubblex + 'px'
    },
    bubbleY () {
      return this.bubbley + 'px'
    },
    bubbleVisibility () {
      return this.bubblev
    },
    bubbleTransform () {
      return this.transformBubble
    },
    BubbleTextTransform () {
      return this.transformBubbleText
    }
  },
  methods: {
    async showDetails (e) {
      this.bubblex = 0
      this.bubbley = 0
      this.transformBubble = ''
      this.transformBubbleText = ''
      this.bubbleTitle = e.title
      this.bubbleText = e.description
      this.bubbleDate = e.start.format('DD/MM/YYYY') + ' - ' + e.end.format('DD/MM/YYYY')
      await this.$nextTick()
      const bubble = document.getElementById('bubble')
      if (bubble !== null) {
        this.bubblex = window.event.pageX - bubble.offsetWidth + 20
        this.bubbley = window.event.pageY - bubble.offsetHeight - 25
        if (this.bubblex < 0) {
          this.transformBubble += 'scaleX(-1)'
          this.transformBubbleText += 'scaleX(-1)'
          this.bubblex = window.event.pageX - 20
        }
        if (this.bubbley < 0) {
          this.transformBubble += ' scaleY(-1)'
          this.transformBubbleText += ' scaleY(-1)'
          this.bubbley = window.event.pageY + 25
        }
        this.bubblev = 'visible'
      }
    },
    hideDetails () {
      this.bubblev = 'hidden'
    },
    onResize () {
      this.hideDetails()
    },
    async onMonthRender () {
      this.hideDetails()
      const response = await this.axios.get('http://localhost:5000/months?month=' + this.getCurrentMonth())
      this.events = response.data
    },
    getCurrentMonth () {
      if (this.$refs.calendar !== undefined) {
        var date = new Date(this.$refs.calendar.fireMethod('getDate'))
        return date.getFullYear().toString() + '-' + (date.getMonth() + 1).toString().padStart(2, '0')
      } else {
        var today = new Date()
        var mm = String(today.getMonth() + 1).padStart(2, '0')
        var yyyy = today.getFullYear()
        return yyyy + '-' + mm
      }
    }
  },
  created () {
    this.onMonthRender()
  },
  mounted () {
    document.querySelector('[aria-label="next"]').onclick = this.onMonthRender
    document.querySelector('[aria-label="prev"]').onclick = this.onMonthRender
    window.addEventListener('resize', this.onResize)
  }
}
</script>

<style lang="css">
.fc-right {
  display: none;
}
.fc-today-button {
  display: none;
}
.fc-sat {
  background:#F7FEFA;
}
.fc-sun {
  background:#F7FEFA;
}
</style>

<style scoped lang="css">
.speech-bubble {
    background: #efefef;
    -webkit-border-radius: 4px;
            border-radius: 4px;
    font-size: 1.2rem;
    line-height: 1.3;
    margin: 0 auto 40px;
    max-width: 400px;
    padding: 15px;
    position: absolute;
    visibility: hidden;
    z-index: 2;
}

.BubbleText {
  display: inline-block;
}

.speech-bubble p {
    margin: 0 0 10px;
}
.speech-bubble p:last-of-type {
    margin-bottom: 0;
}

.speech-bubble::after {
    border-left: 20px solid transparent;
    border-top: 20px solid #efefef;
    bottom: -20px;
    content: "";
    position: absolute;
    right: 20px;
}
</style>
