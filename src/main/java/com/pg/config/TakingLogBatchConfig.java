//package com.pg.config;
//
//import lombok.AllArgsConstructor;
//import lombok.extern.log4j.Log4j2;
//import org.springframework.batch.core.Job;
//import org.springframework.batch.core.Step;
//import org.springframework.batch.core.configuration.annotation.EnableBatchProcessing;
//import org.springframework.batch.core.configuration.annotation.JobBuilderFactory;
//import org.springframework.batch.core.configuration.annotation.StepBuilderFactory;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//
//@Configuration
//@EnableBatchProcessing
//@AllArgsConstructor
//@Log4j2
//public class TakingLogBatchConfig {
//    private final JobBuilderFactory jobBuilderFactory;
//
//    private final StepBuilderFactory stepBuilderFactory;
//
//    @Bean
//    public Job job() {
//        Job job = jobBuilderFactory.get("job").start(step()).build();
//
//        return job;
//    }
//
//    @Bean
//    public Step step() {
//        return stepBuilderFactory.get("step")
//                .tasklet((contribution, chunkContext) -> {
//                    log.info("Step!");
//
//
//                })
//    }
//}
