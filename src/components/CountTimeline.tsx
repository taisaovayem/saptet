"use client";
import { TimeLine } from "@/constants";
import { formatTimeUnit, getCurrentTimeMinutes } from "@/helpers";
import {
  Description,
  Field,
  Label,
  Popover,
  PopoverButton,
  PopoverPanel,
  Select,
} from "@headlessui/react";
import clsx from "clsx";
import dayjs from "dayjs";
import { useEffect, useState } from "react";

const WORK_START_TIME = "work_start_time";
const WORK_END_TIME = "work_end_time";

type CountTimelineProps = {
  matchTimeLine?: TimeLine;
  timeMinutes: number;
};

export function CountTimeline({
  matchTimeLine,
  timeMinutes,
}: CountTimelineProps) {
  function getClientSetting(matchTimeLine: TimeLine): TimeLine {
    if (typeof window !== "undefined") {
      const currentTimeMinutes = getCurrentTimeMinutes();
      const workStartTime = localStorage?.getItem(WORK_START_TIME);
      const workEndTime = localStorage?.getItem(WORK_END_TIME);

      if (
        workStartTime &&
        !isNaN(Number(workStartTime)) &&
        currentTimeMinutes < Number(workStartTime)
      ) {
        return {
          message: "Chưa có tới giờ làm việc bà cố nội ơi",
          start: 0,
          end: Number(workStartTime),
        };
      }
      if (
        workEndTime &&
        !isNaN(Number(workEndTime)) &&
        currentTimeMinutes < Number(workEndTime)
      ) {
        const workEndTimeNumber = Number(workEndTime);
        return {
          message: `Còn {{count}} phút nữa là đến ${formatTimeUnit(Math.floor(workEndTimeNumber / 60))}h${formatTimeUnit(workEndTimeNumber % 60)}`,
          start: 510,
          end: workEndTimeNumber,
        };
      }

      if (
        workEndTime &&
        !isNaN(Number(workEndTime)) &&
        currentTimeMinutes > Number(workEndTime)
      ) {
        const workEndTimeNumber = Number(workEndTime);
        return {
          message: "Hãy relax sau 1 ngày làm việc mịt mủi",
          start: 1050,
          end: workEndTimeNumber,
        };
      }
    }
    return matchTimeLine;
  }

  function setClientSetting(key: string, hours: number, minutes: number) {
    typeof window !== "undefined" &&
      localStorage.setItem(key, (hours * 60 + minutes).toString());
  }
  const [countDownMinues, setCountdownMinues] = useState(
    matchTimeLine ? getClientSetting(matchTimeLine).end - timeMinutes : 0,
  );
  const [startHours, setStartHours] = useState(0);
  const [startMinutes, setStartMinutes] = useState(0);
  const [endHours, setEndHours] = useState(0);
  const [endMinutes, setEndMinutes] = useState(0);
  const message = matchTimeLine
    ? getClientSetting(matchTimeLine)?.message.replaceAll(
        "{{count}}",
        countDownMinues.toString(),
      )
    : "";

  function loadClientSetting() {
    if (window) {
      const start = localStorage.getItem(WORK_START_TIME);
      const end = localStorage.getItem(WORK_END_TIME);

      if (start) {
        const startNum = Number(start);
        const hours = Math.floor(startNum / 60);
        const minutes = startNum % 60;
        setStartHours(hours);
        setStartMinutes(minutes);
      }
      if (end) {
        const endNum = Number(end);
        const hours = Math.floor(endNum / 60);
        const minutes = endNum % 60;
        setEndHours(hours);
        setEndMinutes(minutes);
      }
    }
  }

  useEffect(() => {
    loadClientSetting();
    const initMinutes = dayjs().get("minutes");
    let previousMinutes = initMinutes;
    const interval = setInterval(() => {
      const currentMinutes = dayjs().get("minutes");
      if (currentMinutes !== previousMinutes) {
        setCountdownMinues((previous) => previous - 1);
        previousMinutes = currentMinutes;
      }
    }, 1000);
    return () => clearInterval(interval);
  }, []);
  useEffect(() => {
    if (countDownMinues === 0) {
      window.location.reload();
    }
  }, [countDownMinues]);
  if (!matchTimeLine) return null;
  return (
    <div className="w-full text-center relative">
      {message}
          <Popover>
            <PopoverButton className="cursor-pointer outline-0">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <g
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                >
                  <path
                    strokeDasharray="44"
                    strokeDashoffset="44"
                    d="M7 17v-4l10 -10l4 4l-10 10h-4"
                  >
                    <animate
                      fill="freeze"
                      attributeName="stroke-dashoffset"
                      begin="0.3s"
                      dur="0.5s"
                      to="0"
                    />
                  </path>
                  <path strokeDasharray="20" d="M3 21h18">
                    <animate
                      fill="freeze"
                      attributeName="stroke-dashoffset"
                      dur="0.3s"
                      values="20;0"
                    />
                  </path>
                  <path
                    strokeDasharray="8"
                    strokeDashoffset="8"
                    d="M14 6l4 4"
                  >
                    <animate
                      fill="freeze"
                      attributeName="stroke-dashoffset"
                      begin="0.8s"
                      dur="0.2s"
                      to="0"
                    />
                  </path>
                </g>
              </svg>
            </PopoverButton>
            <PopoverPanel
              transition
              anchor="top"
              className="border p-4 border-gray-400 dark:border-gray- rounded-xl bg-white dark:bg-gray-950"
            >
              <Field>
                <Label className="text-sm/6 font-medium text-black dark:text-white">
                  Thời gian bắt đầu làm việc
                </Label>
                <div className="grid grid-cols-3 gap-4">
                  <div className="relative">
                    <Select
                      value={
                        startHours < 10
                          ? "0" + startHours.toString()
                          : startHours.toString()
                      }
                      onChange={(e) => setStartHours(Number(e.target.value))}
                      className="bg-white text-black dark:bg-black dark:text-white w-14"
                    >
                      <option value="00">00</option>
                      <option value="01">01</option>
                      <option value="02">02</option>
                      <option value="03">03</option>
                      <option value="04">04</option>
                      <option value="05">05</option>
                      <option value="06">06</option>
                      <option value="07">07</option>
                      <option value="08">08</option>
                      <option value="09">09</option>
                      <option value="10">10</option>
                      <option value="11">11</option>
                      <option value="12">12</option>
                      <option value="13">13</option>
                      <option value="14">14</option>
                      <option value="15">15</option>
                      <option value="16">16</option>
                      <option value="17">17</option>
                      <option value="18">18</option>
                      <option value="19">19</option>
                      <option value="20">20</option>
                      <option value="21">21</option>
                      <option value="22">22</option>
                      <option value="23">23</option>
                      <option value="24">24</option>
                    </Select>
                  </div>
                  <div className="text-center">:</div>
                  <div className="relative">
                    <Select
                      value={startMinutes.toString()}
                      onChange={(e) => setStartMinutes(Number(e.target.value))}
                      className="bg-white text-black dark:bg-black dark:text-white w-14"
                    >
                      <option value="00">00</option>
                      <option value="01">01</option>
                      <option value="02">02</option>
                      <option value="03">03</option>
                      <option value="04">04</option>
                      <option value="05">05</option>
                      <option value="06">06</option>
                      <option value="07">07</option>
                      <option value="08">08</option>
                      <option value="09">09</option>
                      <option value="10">10</option>
                      <option value="11">11</option>
                      <option value="12">12</option>
                      <option value="13">13</option>
                      <option value="14">14</option>
                      <option value="15">15</option>
                      <option value="16">16</option>
                      <option value="17">17</option>
                      <option value="18">18</option>
                      <option value="19">19</option>
                      <option value="20">20</option>
                      <option value="21">21</option>
                      <option value="22">22</option>
                      <option value="23">23</option>
                      <option value="24">24</option>
                      <option value="25">25</option>
                      <option value="26">26</option>
                      <option value="27">27</option>
                      <option value="28">28</option>
                      <option value="29">29</option>
                      <option value="30">30</option>
                      <option value="31">31</option>
                      <option value="32">32</option>
                      <option value="33">33</option>
                      <option value="34">34</option>
                      <option value="35">35</option>
                      <option value="36">36</option>
                      <option value="37">37</option>
                      <option value="38">38</option>
                      <option value="39">39</option>
                      <option value="40">40</option>
                      <option value="41">41</option>
                      <option value="42">42</option>
                      <option value="43">43</option>
                      <option value="44">44</option>
                      <option value="45">45</option>
                      <option value="46">46</option>
                      <option value="47">47</option>
                      <option value="48">48</option>
                      <option value="49">49</option>
                      <option value="50">50</option>
                      <option value="51">51</option>
                      <option value="52">52</option>
                      <option value="53">53</option>
                      <option value="54">54</option>
                      <option value="55">55</option>
                      <option value="56">56</option>
                      <option value="57">57</option>
                      <option value="58">58</option>
                      <option value="59">59</option>
                    </Select>
                  </div>
                </div>
              </Field>
              <br />
              <Field>
                <Label className="text-sm/6 font-medium text-black dark:text-white">
                  Thời gian kết thúc làm việc
                </Label>
                <div className="grid grid-cols-3 gap-4">
                  <div className="relative">
                    <Select
                      value={
                        endHours < 10
                          ? "0" + endHours.toString()
                          : endHours.toString()
                      }
                      onChange={(e) => setEndHours(Number(e.target.value))}
                      className="bg-white text-black dark:bg-black dark:text-white w-14"
                    >
                      <option value="00">00</option>
                      <option value="01">01</option>
                      <option value="02">02</option>
                      <option value="03">03</option>
                      <option value="04">04</option>
                      <option value="05">05</option>
                      <option value="06">06</option>
                      <option value="07">07</option>
                      <option value="08">08</option>
                      <option value="09">09</option>
                      <option value="10">10</option>
                      <option value="11">11</option>
                      <option value="12">12</option>
                      <option value="13">13</option>
                      <option value="14">14</option>
                      <option value="15">15</option>
                      <option value="16">16</option>
                      <option value="17">17</option>
                      <option value="18">18</option>
                      <option value="19">19</option>
                      <option value="20">20</option>
                      <option value="21">21</option>
                      <option value="22">22</option>
                      <option value="23">23</option>
                      <option value="24">24</option>
                    </Select>
                  </div>
                  <div className="text-center">:</div>
                  <div className="relative">
                    <Select
                      value={endMinutes.toString()}
                      onChange={(e) => setEndMinutes(Number(e.target.value))}
                      className="bg-white text-black dark:bg-black dark:text-white w-14"
                    >
                      <option value="00">00</option>
                      <option value="01">01</option>
                      <option value="02">02</option>
                      <option value="03">03</option>
                      <option value="04">04</option>
                      <option value="05">05</option>
                      <option value="06">06</option>
                      <option value="07">07</option>
                      <option value="08">08</option>
                      <option value="09">09</option>
                      <option value="10">10</option>
                      <option value="11">11</option>
                      <option value="12">12</option>
                      <option value="13">13</option>
                      <option value="14">14</option>
                      <option value="15">15</option>
                      <option value="16">16</option>
                      <option value="17">17</option>
                      <option value="18">18</option>
                      <option value="19">19</option>
                      <option value="20">20</option>
                      <option value="21">21</option>
                      <option value="22">22</option>
                      <option value="23">23</option>
                      <option value="24">24</option>
                      <option value="25">25</option>
                      <option value="26">26</option>
                      <option value="27">27</option>
                      <option value="28">28</option>
                      <option value="29">29</option>
                      <option value="30">30</option>
                      <option value="31">31</option>
                      <option value="32">32</option>
                      <option value="33">33</option>
                      <option value="34">34</option>
                      <option value="35">35</option>
                      <option value="36">36</option>
                      <option value="37">37</option>
                      <option value="38">38</option>
                      <option value="39">39</option>
                      <option value="40">40</option>
                      <option value="41">41</option>
                      <option value="42">42</option>
                      <option value="43">43</option>
                      <option value="44">44</option>
                      <option value="45">45</option>
                      <option value="46">46</option>
                      <option value="47">47</option>
                      <option value="48">48</option>
                      <option value="49">49</option>
                      <option value="50">50</option>
                      <option value="51">51</option>
                      <option value="52">52</option>
                      <option value="53">53</option>
                      <option value="54">54</option>
                      <option value="55">55</option>
                      <option value="56">56</option>
                      <option value="57">57</option>
                      <option value="58">58</option>
                      <option value="59">59</option>
                    </Select>
                  </div>
                </div>
              </Field>
                      <br />
              <div className="flex justify-center">
                <button
                  className="rounded-md bg-gray-950 dark:bg-gray-200 dark:text-black px-3 py-1.5 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:not-data-focus:outline-none data-focus:outline data-focus:outline-white data-hover:bg-gray-600 data-open:bg-gray-700"
                  onClick={() => {
                    setClientSetting(WORK_START_TIME, startHours, startMinutes);
                    setClientSetting(WORK_END_TIME, endHours, endMinutes);
                    if (window) {
                      location.reload();
                    }
                  }}
                >
                  Lưu
                </button>
              </div>
            </PopoverPanel>
          </Popover>
    </div>
  );
}
